import { Document, Font, Link, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { linkFor, printableBullets, type Cv, type CvEntry, type CvSection } from "@/lib/cv";

// Measurements come from the original Word export: US Letter, half-inch
// margins, Calibri. Carlito shares Calibri's metrics, so lines wrap where they
// did in Word. Sizes are in points.
const PAGE_WIDTH = 612;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
const BODY_SIZE = 11.04;
const BULLET_HANG = 4.6;
const BULLET_INDENT = 13.6;
// Word sets Calibri without ligatures; they also trip up some ATS parsers.
const FEATURES = { liga: false, clig: false };

/** Width in points of body-size text. */
export type Measure = (text: string, bold?: boolean) => number;

let registeredFontBase: string | null = null;

export async function loadCvFonts(base: string): Promise<Measure> {
  if (registeredFontBase !== base) {
    Font.register({
      family: "Carlito",
      fonts: [
        { src: `${base}/Carlito-Regular.ttf` },
        { src: `${base}/Carlito-Bold.ttf`, fontWeight: 700 },
      ],
    });
    // Word never hyphenated the résumé; react-pdf does by default.
    Font.registerHyphenationCallback((word) => [word]);
    registeredFontBase = base;
  }

  const regular = { fontFamily: "Carlito" };
  const bold = { fontFamily: "Carlito", fontWeight: 700 };
  await Promise.all([Font.load(regular), Font.load(bold)]);
  const fonts = [Font.getFont(regular).data!, Font.getFont(bold).data!];

  return (text, isBold = false) => {
    const font = fonts[isBold ? 1 : 0];
    return (font.layout(text, FEATURES).advanceWidth * BODY_SIZE) / font.unitsPerEm;
  };
}

/**
 * Breaks lines greedily, as Word does. react-pdf's Knuth-Plass breaker lets
 * ragged-right lines run past the margin by counting on space it never
 * squeezes, so paragraphs reach it with their line breaks already chosen.
 */
function wrap(text: string, measure: Measure, width: number, firstLineWidth = width) {
  const lines: string[] = [];
  let line = "";

  for (const word of text.trim().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate) > (lines.length ? width : firstLineWidth)) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.join("\n");
}

const styles = StyleSheet.create({
  page: {
    padding: MARGIN,
    fontFamily: "Carlito",
    fontSize: BODY_SIZE,
    fontFeatureSettings: FEATURES,
    lineHeight: 1.3,
    color: "#000",
  },
  name: { fontSize: 24, lineHeight: 1.2, textAlign: "center" },
  contacts: { marginTop: 2.4, marginBottom: 5.4, textAlign: "center" },
  link: { color: "#000", textDecoration: "none" },
  sectionTitle: {
    fontSize: 12.48,
    lineHeight: 1.18,
    // Word draws paragraph borders slightly past the text margins.
    marginHorizontal: -1.44,
    paddingHorizontal: 1.44,
    paddingBottom: 0.7,
    borderBottomWidth: 0.72,
    borderBottomColor: "#000",
    marginBottom: 0.8,
  },
  entry: { marginTop: 5 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { flex: 1 },
  entryMeta: { marginLeft: 12, textAlign: "right" },
  bold: { fontWeight: 700 },
  bullet: { flexDirection: "row" },
  bulletMark: { width: BULLET_INDENT + BULLET_HANG, marginLeft: -BULLET_HANG },
  bulletText: { flex: 1 },
});

function Linked({ text }: { text: string }) {
  const href = linkFor(text);
  return href ? (
    <Link src={href} style={styles.link}>
      {text}
    </Link>
  ) : (
    <>{text}</>
  );
}

function Entry({ entry, first, measure }: { entry: CvEntry; first: boolean; measure: Measure }) {
  const bullets = printableBullets(entry.bullets);
  const hasHeader = entry.title.trim() || entry.subtitle.trim() || entry.meta.trim();

  return (
    <View style={first ? undefined : styles.entry} wrap={false}>
      {hasHeader ? (
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>
            <Text style={styles.bold}>{entry.title}</Text>
            {entry.subtitle.trim() ? ` – ${entry.subtitle}` : ""}
          </Text>
          {entry.meta.trim() ? (
            <Text style={styles.entryMeta}>
              <Linked text={entry.meta} />
            </Text>
          ) : null}
        </View>
      ) : null}
      {bullets.map((bullet, index) => (
        <View key={index} style={styles.bullet}>
          <Text style={styles.bulletMark}>●</Text>
          <Text style={styles.bulletText}>
            {wrap(bullet, measure, CONTENT_WIDTH - BULLET_INDENT)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function Section({ section, measure }: { section: CvSection; measure: Measure }) {
  return (
    <View>
      <Text style={styles.sectionTitle} minPresenceAhead={40}>
        {section.title}
      </Text>
      {section.kind === "skills"
        ? section.skills.map((skill) => {
            const label = skill.label.trim() ? `${skill.label.trim()}: ` : "";
            const firstLine = CONTENT_WIDTH - (label ? measure(label, true) : 0);
            return (
              <Text key={skill.id}>
                {label ? <Text style={styles.bold}>{label}</Text> : null}
                {wrap(skill.value, measure, CONTENT_WIDTH, firstLine)}
              </Text>
            );
          })
        : section.entries.map((entry, index) => (
            <Entry key={entry.id} entry={entry} first={index === 0} measure={measure} />
          ))}
    </View>
  );
}

export function CvDocument({ cv, measure }: { cv: Cv; measure: Measure }) {
  const contacts = cv.contacts.filter((contact) => contact.text.trim());

  return (
    <Document title={`${cv.name} Resume`} author={cv.name} creator={cv.name}>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{cv.name}</Text>
        <Text style={styles.contacts}>
          {contacts.map((contact, index) => (
            <Text key={contact.id}>
              {index > 0 ? " | " : ""}
              <Linked text={contact.text.trim()} />
            </Text>
          ))}
        </Text>
        {cv.sections.map((section) => (
          <Section key={section.id} section={section} measure={measure} />
        ))}
      </Page>
    </Document>
  );
}

/** Counts page objects; react-pdf writes their dictionaries uncompressed. */
export async function countPdfPages(blob: Blob) {
  const source = await blob.text();
  return source.match(/\/Type\s*\/Page(?![a-z])/g)?.length ?? 0;
}

export async function renderCvPdf(cv: Cv) {
  const measure = await loadCvFonts(`${window.location.origin}/fonts/carlito`);
  const blob = await pdf(<CvDocument cv={cv} measure={measure} />).toBlob();
  return { blob, pages: await countPdfPages(blob) };
}
