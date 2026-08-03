import { useState, useRef, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  absoluteApiUrl,
  beginInnovationCityLogin,
  BuildView,
  clearAccessToken,
  createIdempotencyKey,
  DeploymentView,
  fetchInnovationCityApiToken,
  hasAccessToken,
  innovationCityLogout,
  launchKitApi,
  LaunchKitApiError,
  MockupView,
  OperationView,
  PageLayout,
  ProjectSummaryView,
  ProjectView,
  setAccessToken,
  waitForDeployment,
  waitForOperation,
  watchBuild,
  WizardCatalog,
} from "./launchkit-api";
import {
  colorFontSchema,
  ColorFontValues,
  customFontsSchema,
  customPaletteSchema,
  designSelectionSchema,
  DesignSelectionValues,
  mockupSelectionSchema,
  MockupSelectionValues,
  pageLayoutSchema,
  PageLayoutValues,
  profileFileSchema,
  questionnaireSchema,
  QuestionnaireValues,
} from "./wizard-validation";

import { ErrorToast } from "./components/common/ErrorToast";
import { PickPagesPage } from "./pages/PickPages/PickPagesPage";
import { DownloadPage } from "./pages/Download/DownloadPage";
import { PreviewPage } from "./pages/Preview/PreviewPage";
import { QuestionnaireForm, QuestionnairePage } from "./pages/Questionnaire/QuestionnairePage";
import { CategoryMoodPage } from "./pages/CategoryMood/CategoryMoodPage";
import { ProjectsPage } from "./pages/Projects/ProjectsPage";
import { GeneratingPage } from "./pages/Generating/GeneratingPage";
import { BuildingPage } from "./pages/Building/BuildingPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { LogoSvg } from "./components/common/LogoSvg";
import { ScaledPage } from "./components/common/ScaledPage";
import { Spinner } from "./components/common/Spinner";
import { SubNav } from "./components/common/SubNav";
import { TopHeader } from "./components/common/TopHeader";
import { firstValidationError, ValidationError } from "./components/common/ValidationError";

import svgPathsLogin from "@/imports/AiLaunchKitLoginPage/svg-8vlpvs8i0v";
import svgPathsDl from "@/imports/AiLaunchKitDownloadingGeneratedWebsitesPage/svg-7argp47g3q";
import svgPathsMerged from "@/imports/AiLaunchKitMainPageMergedFlow/svg-9l4sd51871";
import svgPathsCatMood from "@/imports/AiLaunchKitDesignCategoryMood/svg-aiiheluzwm";

type Page =
  | "login"
  | "projects"
  | "questionnaire"
  | "category-mood"
  | "colors"
  | "pick-pages"
  | "generating"
  | "preview"
  | "building"
  | "download";




// ─── PAGE 5: Colors & Fonts ───────────────────────────────────────────────────
type PaletteEntry = { id?: string; name: string; primary: string; secondary: string; background: string; text: string };

type FontPair = { id?: string; name: string; heading: string; body: string };

// Top-200 Google Fonts for the custom font search
const GOOGLE_FONTS_LIST = [
  "ABeeZee","Abel","Abhaya Libre","Abril Fatface","Aclonica","Acme","Actor","Adamina","Advent Pro","Aguafina Script","Akronim","Aladin","Aldrich","Alef","Alegreya","Alegreya SC","Alegreya Sans","Alegreya Sans SC","Aleo","Alex Brush","Alfa Slab One","Alice","Alike","Alike Angular","Allan","Allerta","Allerta Stencil","Allura","Almarai","Almendra","Almendra Display","Almendra SC","Amatic SC","Amethysta","Amiko","Amiri","Amita","Anaheim","Andada Pro","Andika","Angkor","Annie Use Your Telescope","Anonymous Pro","Antic","Antic Didone","Antic Slab","Anton","Arbutus","Arbutus Slab","Architects Daughter","Archivo","Archivo Black","Archivo Narrow","Aref Ruqaa","Arima Madurai","Arimo","Arizonia","Armata","Arsenal","Arvo","Arya","Asap","Asap Condensed","Asset","Assistant","Astloch","Asul","Athiti","Atma","Atomic Age","Aubrey","Audiowide","Autour One","Average","Average Sans","Averia Gruesa Libre","Averia Libre","Averia Sans Libre","Averia Serif Libre","B612","B612 Mono","Bad Script","Bahiana","Bahianita","Baloo 2","Baloo Bhai 2","Baloo Bhaijaan 2","Baloo Bhaina 2","Baloo Chettan 2","Baloo Da 2","Baloo Paaji 2","Baloo Tamma 2","Baloo Tammudu 2","Baloo Thambi 2","Balsamiq Sans","Balthazar","Bangers","Barlow","Barlow Condensed","Barlow Semi Condensed","Barriecito","Barrio","Basic","Baskervville","Battambang","Baumans","Bayon","Be Vietnam Pro","Bebas Neue","Belgrano","Bellefair","Belleza","Bellota","Bellota Text","BenchNine","Benne","Bentham","Berkshire Swash","Beth Ellen","Bevan","Big Shoulders Display","Big Shoulders Inline Display","Big Shoulders Inline Text","Big Shoulders Stencil Display","Big Shoulders Stencil Text","Big Shoulders Text","Bigelow Rules","Bigshot One","Bilbo","Bilbo Swash Caps","BioRhyme","BioRhyme Expanded","Birthstone","Birthstone Bounce","Biryani","Bitter","Black And White Picture","Black Han Sans","Black Ops One","Blinker","Bonbon","Boogaloo","Bowlby One","Bowlby One SC","Brawler","Bree Serif","Brygada 1918","Bubblegum Sans","Bubbler One","Buenard","Bungee","Bungee Hairline","Bungee Inline","Bungee Outline","Bungee Shade","Butcherman","Butterfly Kids","Cabin","Cabin Condensed","Cabin Sketch","Caesar Dressing","Cagliostro","Cairo","Cairo Play","Caladea","Calistoga","Calligraffitti","Cambay","Cambo","Candal","Cantarell","Cantata One","Cantora One","Capriola","Caramel","Carattere","Cardo","Carme","Carrois Gothic","Carrois Gothic SC","Carter One","Castoro","Catamaran","Caudex","Caveat","Caveat Brush","Cedarville Cursive","Ceviche One","Chakra Petch","Changa","Changa One","Chango","Charm","Charmonman","Chathura","Chau Philomene One","Chela One","Chelsea Market","Chenla","Cherry Cream Soda","Cherry Swash","Chewy","Chicle","Chilanka","Chivo","Chivo Mono","Chonburi","Cinzel","Cinzel Decorative","Clicker Script","Coda","Coda Caption","Codystar","Coiny","Combo","Comfortaa","Comforter","Comforter Brush","Comic Neue","Coming Soon","Commissioner","Concert One","Condiment","Content","Contrail One","Convergence","Cookie","Copse","Corben","Corinthia","Cormorant","Cormorant Garamond","Cormorant Infant","Cormorant SC","Cormorant Unicase","Cormorant Upright","Courgette","Courier Prime","Cousine","Coustard","Covered By Your Grace","Crafty Girls","Creepster","Crete Round","Crimson Pro","Crimson Text","Croissant One","Crushed","Cuprum","Cute Font","Cutive","Cutive Mono","DM Mono","DM Sans","DM Serif Display","DM Serif Text","Damion","Dancing Script","Dangrek","Darker Grotesque","David Libre","Dawning of a New Day","Days One","Dekko","Dela Gothic One","Delius","Delius Swash Caps","Delius Unicase","Della Respira","Denk One","Devonshire","Dhurjati","Didact Gothic","Diplomata","Diplomata SC","Do Hyeon","Dokdo","Domine","Donegal One","Dongle","Doppio One","Dorsa","Dosis","DotGothic16","Duru Sans","Dynalight","EB Garamond","Eagle Lake","East Sea Dokdo","Eater","Economica","Eczar","El Messiri","Electrolize","Elsie","Elsie Swash Caps","Emblema One","Emilys Candy","Encode Sans","Encode Sans Condensed","Encode Sans Expanded","Encode Sans SC","Encode Sans Semi Condensed","Encode Sans Semi Expanded","Engagement","Englebert","Enriqueta","Ephesis","Epilogue","Erica One","Esteban","Estonia","Euphoria Script","Ewert","Exo","Exo 2","Expletus Sans","Explora","Fahkwang","Familjen Grotesk","Fanwood Text","Farro","Farsan","Fascinate","Fascinate Inline","Faster One","Fasthand","Fauna One","Faustina","Federant","Federo","Felipa","Fenix","Festive","Figtree","Finger Paint","Finlandica","Fira Code","Fira Mono","Fira Sans","Fira Sans Condensed","Fira Sans Extra Condensed","Fjalla One","Fjord One","Flamenco","Flavors","Fleur De Leah","Flow Block","Flow Circular","Flow Rounded","Fondamento","Fontdiner Swanky","Forum","Fragment Mono","Francois One","Frank Ruhl Libre","Fraunces","Freckle Face","Fredericka the Great","Fredoka","Freehand","Fresca","Frijole","Fruktur","Fugaz One","Fuggles","Fuzzy Bubbles","GFS Didot","GFS Neohellenic","Gabriela","Gaegu","Gafata","Galada","Galdeano","Galindo","Gamja Flower","Gantari","Gayathri","Gelasio","Gemunu Libre","Genos","Gentium Book Plus","Gentium Plus","Geo","Georama","Geostar","Geostar Fill","Germania One","Gideon Roman","Gidugu","Gilda Display","Girassol","Give You Glory","Glass Antiqua","Glegoo","Gloock","Gloria Hallelujah","Gluten","Goblin One","Gochi Hand","Goldman","Gorditas","Gothic A1","Gotu","Goudy Bookletter 1911","Goudy Starved","Graduate","Grand Hotel","Grandstander","Gravitas One","Great Vibes","Grechen Fuemen","Grenze","Grenze Gotisch","Grey Qo","Griffy","Gruppo","Gudea","Gugi","Gulzar","Gupter","Gurajada","Gwendolyn","Habibi","Hachi Maru Pop","Hahmlet","Halant","Hammersmith One","Hanalei","Hanalei Fill","Handlee","Hanuman","Happy Monkey","Harmattan","Headland One","Heebo","Henny Penny","Hepta Slab","Herr Von Muellerhoff","Hi Melody","Hiragino Sans","Holtwood One SC","Homemade Apple","Homenaje","Hubballi","Hurricane","IBM Plex Mono","IBM Plex Sans","IBM Plex Sans Arabic","IBM Plex Sans Condensed","IBM Plex Sans Devanagari","IBM Plex Sans Hebrew","IBM Plex Sans KR","IBM Plex Sans Thai","IBM Plex Sans Thai Looped","IBM Plex Serif","IM Fell Double Pica","IM Fell DW Pica","IM Fell English","IM Fell English SC","IM Fell French Canon","IM Fell French Canon SC","IM Fell Great Primer","IM Fell Great Primer SC","Ibarra Real Nova","Iceberg","Iceland","Imbue","Imperial Script","Imprima","Inconsolata","Inder","Indie Flower","Ingrid Darling","Inika","Inknut Antiqua","Inria Sans","Inria Serif","Inspiration","Inter","Inter Tight","Irish Grover","Island Moments","Istok Web","Italiana","Italianno","Itim","Jacques Francois","Jacques Francois Shadow","Jaldi","JetBrains Mono","Jim Nightshade","Joan","Josefin Sans","Josefin Slab","Jost","Joti One","Jua","Judson","Julee","Julius Sans One","Junge","Jura","Just Another Hand","Just Me Again Down Here","K2D","Kaisei Decol","Kaisei HarunoUmi","Kaisei Opti","Kaisei Tokumin","Kalam","Karla","Karma","Katibeh","Kaushan Script","Kavivanar","Kavoon","Kdam Thmor Pro","Keania One","Kelly Slab","Kenia","Khand","Khmer","Khula","Kings","Kirang Haerang","Kite One","Kiwi Maru","Klee One","Knewave","KoHo","Kodchasan","Koh Santepheap","Kolker Brush","Konkhmer Sleokchher","Kosugi","Kosugi Maru","Kotta One","Koulen","Kranky","Kreon","Kristi","Krona One","Krub","Kufam","Kulim Park","Kumar One","Kumar One Outline","Kumbh Sans","Kurale","La Belle Aurore","Lacquer","Laila","Lakki Reddy","Lalezar","Lancelot","Langar","Lateef","Lato","League Gothic","League Script","League Spartan","Leckerli One","Ledger","Lekton","Lemon","Lemonada","Lexend","Lexend Deca","Lexend Exa","Lexend Giga","Lexend Mega","Lexend Peta","Lexend Tera","Lexend Zetta","Libre Baskerville","Libre Bodoni","Libre Caslon Display","Libre Caslon Text","Libre Franklin","Licorice","Life Savers","Lilita One","Lily Script One","Limelight","Linden Hill","Lithograph","Literata","Liu Jian Mao Cao","Livvic","Lobster","Lobster Two","Londrina Outline","Londrina Shadow","Londrina Sketch","Londrina Solid","Long Cang","Lora","Love Light","Love Ya Like A Sister","Loved by the King","Lovers Quarrel","Luckiest Guy","Lusitana","Lustria","Luxurious Roman","Luxurious Script","M PLUS 1","M PLUS 1 Code","M PLUS 1p","M PLUS 2","M PLUS Code Latin","M PLUS Rounded 1c","Ma Shan Zheng","Macondo","Macondo Swash Caps","Mada","Magra","Maiden Orange","Maitree","Major Mono Display","Mako","Mali","Mallanna","Mandali","Manjari","Manrope","Mansalva","Manuale","Marcellus","Marcellus SC","Marck Script","Margarine","Marhey","Markazi Text","Marko One","Marmelad","Martel","Martel Sans","Marvel","Mate","Mate SC","Maven Pro","McLaren","Mea Culpa","Meddon","MedievalSharp","Medula One","Meera Inimai","Megrim","Meie Script","Meow Script","Merienda","Merriweather","Merriweather Sans","Metal","Metal Mania","Metamorphous","Metrophobic","Michroma","Milonga","Miltonian","Miltonian Tattoo","Mina","Mingzat","Miniver","Miriam Libre","Mirza","Miss Fajardose","Mitr","Mochiy Pop One","Mochiy Pop P One","Modak","Modern Antiqua","Mogra","Mohave","Molengo","Molle","Monda","Monofett","Monomaniac One","Monoton","Monsieur La Doulaise","Montaga","Montagu Slab","MonteCarlo","Montez","Montserrat","Montserrat Alternates","Montserrat Subrayada","Moo Lah Lah","Moon Dance","Moul","Moulpali","Mountains of Christmas","Mouse Memoirs","Mr Bedfort","Mr Dafoe","Mr De Haviland","Mrs Saint Delafield","Mrs Sheppards","Ms Madi","Mukta","Mukta Mahee","Mukta Malar","Mukta Vaani","Mulish","Murecho","MuseoModerno","Mystery Quest","NTR","Nanum Brush Script","Nanum Gothic","Nanum Gothic Coding","Nanum Myeongjo","Nanum Pen Script","Neonderthaw","Nerko One","Neucha","Neuton","New Rocker","New Tegomin","News Cycle","Newsreader","Niconne","Niramit","Nixie One","Nobile","Nokora","Norican","Nosifer","Notable","Nothing You Could Do","Noticia Text","Noto Color Emoji","Noto Emoji","Noto Kufi Arabic","Noto Music","Noto Naskh Arabic","Noto Nastaliq Urdu","Noto Rashi Hebrew","Noto Sans","Noto Serif","Nova Cut","Nova Flat","Nova Mono","Nova Oval","Nova Round","Nova Script","Nova Slim","Nova Square","Numans","Nunito","Nunito Sans","Odibee Sans","Odor Mean Chey","Offside","Oi","Ojuju","Old Standard TT","Oldenburg","Ole","Oleo Script","Oleo Script Swash Caps","Onest","Open Sans","Oranienbaum","Orbit","Orbitron","Oregano","Orienta","Original Surfer","Oswald","Outfit","Over the Rainbow","Overlock","Overlock SC","Overpass","Overpass Mono","Ovo","Oxanium","Oxygen","Oxygen Mono","PT Mono","PT Sans","PT Sans Caption","PT Sans Narrow","PT Serif","PT Serif Caption","Pacifico","Padauk","Padyakke Expanded One","Palanquin","Palanquin Dark","Palette Mosaic","Pangolin","Paprika","Parisienne","Passero One","Passion One","Passions Conflict","Pathway Extreme","Pathway Gothic One","Patrick Hand","Patrick Hand SC","Pattaya","Patua One","Pavanam","Paytone One","Peddana","Peralta","Permanent Marker","Petemoss","Petit Formal Script","Petrona","Phetsarath OT","Philosopher","Piazzolla","Piedra","Pinyon Script","Pirata One","Plaster","Play","Playball","Playfair Display","Playfair Display SC","Playfair Display","Plus Jakarta Sans","Podkova","Poiret One","Poller One","Poltawski Nowy","Poly","Pompiere","Pontano Sans","Poor Story","Poppins","Potta One","Pragati Narrow","Praise","Prata","Preahvihear","Press Start 2P","Pridi","Princess Sofia","Prociono","Prompt","Prosto One","Proza Libre","Public Sans","Puppies Play","Puritan","Purple Purse","Qahiri","Quando","Quantico","Quattrocento","Quattrocento Sans","Questrial","Quicksand","Quintessential","Qwigley","Qwitcher Grypen","Racing Sans One","Radio Canada","Radley","Rajdhani","Rakkas","Raleway","Raleway Dots","Ramabhadra","Ramaraja","Rambla","Rammetto One","Rampart One","Rancho","Ranga","Rasa","Rationale","Ravi Prakash","Readex Pro","Recursive","Red Hat Display","Red Hat Mono","Red Hat Text","Red Rose","Redacted","Redacted Script","Reenie Beanie","Reggae One","Revalia","Rhodium Libre","Ribeye","Ribeye Marrow","Righteous","Risque","Road Rage","Roboto","Roboto Condensed","Roboto Flex","Roboto Mono","Roboto Serif","Roboto Slab","Rochester","Rock 3D","Rock Salt","RocknRoll One","Rokkitt","Romanesco","Ropa Sans","Rosario","Rosarivo","Rouge Script","Rowdies","Rozha One","Rubik","Rubik 80s Fade","Rubik Beastly","Rubik Bubbles","Rubik Burned","Rubik Dirt","Rubik Distressed","Rubik Gemstones","Rubik Glitch","Rubik Iso","Rubik Marker Hatch","Rubik Maze","Rubik Microbe","Rubik Mono One","Rubik Moonrocks","Rubik One","Rubik Pixels","Rubik Puddles","Rubik Scribble","Rubik Spray Paint","Rubik Storm","Rubik Vinyl","Rubik Wet Paint","Ruda","Rufina","Ruge Boogie","Ruluko","Rum Raisin","Ruslan Display","Russo One","Ruthie","Rye","STIX Two Text","Sacramento","Sahitya","Sail","Saira","Saira Condensed","Saira Extra Condensed","Saira Semi Condensed","Saira Stencil One","Salsa","Sanchez","Sancreek","Sansita","Sansita Swashed","Sarabun","Sarala","Sarina","Sarpanch","Sassy Frass","Satisfy","Sawarabi Gothic","Sawarabi Mincho","Scada","Scheherazade New","Schibsted Grotesk","Schoolbell","Scope One","Seaweed Script","Secular One","Sedgwick Ave","Sedgwick Ave Display","Sen","Sevillana","Seymour One","Shadows Into Light","Shadows Into Light Two","Shalimar","Shantell Sans","Shanti","Share","Share Tech","Share Tech Mono","Shippori Antique","Shippori Antique B1","Shippori Mincho","Shippori Mincho B1","Shizuru","Shojumaru","Short Stack","Shrikhand","Siemreap","Sigmar","Sigmar One","Signika","Signika Negative","Simonetta","Single Day","Sintony","Sirin Stencil","Six Caps","Skranji","Slabo 13px","Slabo 27px","Slackey","Sloshy","Smythe","Sniglet","Snippet","Snowburst One","Sofadi One","Sofia","Sofia Sans","Sofia Sans Condensed","Sofia Sans Extra Condensed","Sofia Sans Semi Condensed","Solway","Song Myung","Sono","Sonsie One","Sora","Sorts Mill Goudy","Source Code Pro","Source Sans 3","Source Serif 4","Space Grotesk","Space Mono","Special Elite","Spectral","Spectral SC","Spicy Rice","Spinnaker","Spirax","Splash","Spline Sans","Spline Sans Mono","Squada One","Square Peg","Sree Krushnadevaraya","Sriracha","Srisakdi","Staatliches","Stalemate","Stalinist One","Stardos Stencil","Stick","Stick No Bills","Stint Ultra Condensed","Stint Ultra Expanded","Stoke","Strait","Style Script","Stylish","Sue Ellen Francisco","Suez One","Sulphur Point","Sumana","Sunflower","Sunshiney","Supermercado One","Sura","Suranna","Suravaram","Suwannaphum","Swanky and Moo Moo","Syncopate","Syne","Syne Mono","Syne Tactile","Tai Heritage Pro","Tajawal","Tangerine","Tapestry","Taprom","Tauri","Taviraj","Teko","Tektur","Tenali Ramakrishna","Tenor Sans","Text Me One","Thasadith","The Girl Next Door","The Nautigal","Tienne","Tillana","Tilt Neon","Tilt Prism","Tilt Warp","Timmana","Tinos","Tiro Bangla","Tiro Devanagari Hindi","Tiro Devanagari Marathi","Tiro Devanagari Sanskrit","Tiro Gurmukhi","Tiro Kannada","Tiro Tamil","Tiro Telugu","Titan One","Titillium Web","Tomorrow","Tourney","Trade Winds","Train One","Trirong","Trocchi","Trochut","Truculenta","Tsukimi Rounded","Tulpen One","Turret Road","Twinkle Star","Ubuntu","Ubuntu Condensed","Ubuntu Mono","Uchen","Ultra","Unbounded","Uncial Antiqua","Underdog","Unica One","UnifrakturCook","UnifrakturMaguntia","Unkempt","Unlock","Unna","Updock","Urbanist","Varta","Vesper Libre","Viaoda Libre","Vibes","Vibur","Victor Mono","Vidaloka","Viga","Vujahday Script","Vollkorn","Vollkorn SC","Voltaire","Vonique","Waiting for the Sunrise","Wallpoet","Walter Turncoat","Warnes","Water Brush","Waterfall","Wavefont","Wellfleet","Wendy One","Whisper","WindSong","Wire One","Wix Madefor Display","Wix Madefor Text","Work Sans","Xanh Mono","Yaldevi","Yanone Kaffeesatz","Yantramanav","Yatra One","Yellowtail","Yeon Sung","Yeseva One","Yesteryear","Yomogi","Young Serif","Yrsa","Yuji Boku","Yuji Mai","Yuji Syuku","Yusei Magic","ZCOOL KuaiLe","ZCOOL QingKe HuangYou","ZCOOL XiaoWei","Zen Antique","Zen Antique Soft","Zen Dots","Zen Kaku Gothic Antique","Zen Kaku Gothic New","Zen Kurenaido","Zen Loop","Zen Maru Gothic","Zen Old Mincho","Zen Tokyo Zoo","Zeyada","Zhi Mang Xing","Zilla Slab","Zilla Slab Highlight",
];

type CustomPalette = { primary: string; secondary: string; background: string; text: string };
export function ColorsFontsPage({ project, catalog, onSave, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  catalog: WizardCatalog;
  onSave: (paletteId: string, customPalette: CustomPalette | null, fontId: string, customFonts: { heading: string; body: string } | null) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const palettes: PaletteEntry[] = catalog.palettes
    .filter((item) => item.colors)
    .map((item) => ({ id: item.id, name: item.label, ...item.colors! }));
  const fontPairs: FontPair[] = catalog.fontPairings
    .filter((item) => item.fonts)
    .map((item) => ({ id: item.id, name: item.label, ...item.fonts! }));
  const [selectedPalette, setSelectedPalette] = useState(
    project.design.paletteId === "custom"
      ? palettes.length
      : Math.max(0, palettes.findIndex((item) => item.id === project.design.paletteId)),
  );
  const [selectedFont, setSelectedFont] = useState(
    project.design.fontPairingId === "custom"
      ? fontPairs.length
      : Math.max(0, fontPairs.findIndex((item) => item.id === project.design.fontPairingId)),
  );
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customPaletteError, setCustomPaletteError] = useState<string>();
  const [specificColors, setSpecificColors] = useState(false);
  const [customPalette, setCustomPalette] = useState<CustomPalette | null>(project.design.customPalette);
  const [customDraft, setCustomDraft] = useState<CustomPalette>({ primary: "", secondary: "", background: "", text: "" });
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [customFontError, setCustomFontError] = useState<string>();
  const [customFont, setCustomFont] = useState<FontPair | null>(
    project.design.customFonts
      ? { name: "Custom", ...project.design.customFonts }
      : null,
  );
  const [fontDraft, setFontDraft] = useState<{ heading: string; body: string }>({ heading: "", body: "" });
  const [headingSearch, setHeadingSearch] = useState("");
  const [bodySearch, setBodySearch] = useState("");
  const { setValue, handleSubmit, formState: { errors } } = useForm<ColorFontValues>({
    resolver: zodResolver(colorFontSchema),
    defaultValues: {
      paletteId: project.design.paletteId || palettes[0]?.id || "",
      customPalette: project.design.customPalette,
      fontPairingId: project.design.fontPairingId || fontPairs[0]?.id || "",
      customFonts: project.design.customFonts,
    },
    mode: "onChange",
  });

  const continueColors = () => {
    const paletteId = selectedPalette === palettes.length ? "custom" : palettes[selectedPalette]?.id;
    const fontId = selectedFont === fontPairs.length ? "custom" : fontPairs[selectedFont]?.id;
    const customFonts = fontId === "custom" && customFont
      ? { heading: customFont.heading, body: customFont.body }
      : null;
    setValue("paletteId", paletteId ?? "", { shouldDirty: true, shouldValidate: true });
    setValue("customPalette", paletteId === "custom" ? customPalette : null, { shouldDirty: true, shouldValidate: true });
    setValue("fontPairingId", fontId ?? "", { shouldDirty: true, shouldValidate: true });
    setValue("customFonts", customFonts, { shouldDirty: true, shouldValidate: true });
    void handleSubmit((values) => onSave(
      values.paletteId,
      values.customPalette,
      values.fontPairingId,
      values.customFonts,
    ))();
  };

  return (
    <ScaledPage
      scrollable
      header={<><TopHeader /><SubNav activeStep={2} completedUpTo={completedUpTo} onBack={onBack} onNext={busy ? undefined : continueColors} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(20px,4vw,40px)]">
          {/* Palettes section */}
          <div className="flex flex-col gap-[20px]">
            <span
              className="font-semibold uppercase text-[13px]"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            >
              Theme Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 7 preset palette cards */}
              {palettes.map((palette, i) => {
                const colors = [palette.primary, palette.secondary, palette.background, palette.text];
                const selected = selectedPalette === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedPalette(i)}
                    className="relative flex flex-col rounded-[8px] overflow-hidden"
                    style={{
                      height: 80,
                      outline: selected ? "2px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                      outlineOffset: selected ? 2 : 0,
                    }}
                  >
                    <div className="flex w-full" style={{ height: 58 }}>
                      {colors.map((color, j) => (
                        <div key={j} className="flex-1 h-full" style={{ background: color }} />
                      ))}
                    </div>
                    <div
                      className="flex items-center justify-center w-full"
                      style={{ height: 22, background: "#1a1a1a", fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, letterSpacing: "0.03em" }}
                    >
                      {palette.name}
                    </div>
                    <div
                      className="absolute top-[6px] right-[6px] flex items-center justify-center rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        background: selected ? "#6fccdd" : "rgba(0,0,0,0.3)",
                        border: selected ? "none" : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {selected && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Custom palette card */}
              {(() => {
                const CUSTOM_IDX = palettes.length;
                const selected = selectedPalette === CUSTOM_IDX;
                return (
                  <button
                    onClick={() => {
                      setCustomPaletteError(undefined);
                      if (customPalette) setCustomDraft({ ...customPalette });
                      setCustomModalOpen(true);
                    }}
                    className="relative flex flex-col rounded-[8px] overflow-hidden"
                    style={{
                      height: 80,
                      outline: selected ? "2px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                      outlineOffset: selected ? 2 : 0,
                      background: customPalette
                        ? undefined
                        : "rgba(255,255,255,0.03)",
                    }}
                  >
                    {customPalette ? (
                      <div className="flex w-full" style={{ height: 58 }}>
                        {[customPalette.primary, customPalette.secondary, customPalette.background, customPalette.text].map((c, j) => (
                          <div key={j} className="flex-1 h-full" style={{ background: c }} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full" style={{ height: 58, gap: 4 }}>
                        {/* Paint palette icon */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="8.5" cy="9" r="1.5" fill="#6FCCDD" />
                          <circle cx="12" cy="6.5" r="1.5" fill="#EC4899" />
                          <circle cx="15.5" cy="9" r="1.5" fill="#F5D76E" />
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10 1.104 0 2-.896 2-2a1.99 1.99 0 00-.512-1.342c-.13-.149-.247-.31-.347-.48a2 2 0 011.73-3.178h1.943C19.379 15 22 12.379 22 9.129 22 5.195 17.522 2 12 2z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    <div
                      className="flex items-center justify-center w-full"
                      style={{ height: 22, background: "#1a1a1a", fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, letterSpacing: "0.03em" }}
                    >
                      Custom
                    </div>
                    <div
                      className="absolute top-[6px] right-[6px] flex items-center justify-center rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        background: selected ? "#6fccdd" : "rgba(0,0,0,0.3)",
                        border: selected ? "none" : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {selected && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })()}
            </div>

            {/* Custom palette modal */}
            {customModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
                onClick={() => setCustomModalOpen(false)}
              >
                <div
                  className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[420px] max-h-[90vh] overflow-y-auto"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-[17px]">Custom Palette</span>
                    <button onClick={() => setCustomModalOpen(false)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-center gap-[10px]" style={{ cursor: "pointer" }}>
                    <div
                      onClick={() => {
                        const next = !specificColors;
                        setSpecificColors(next);
                        if (!next) {
                          // Regenerate derived colors from current primary
                          const hex = customDraft.primary.replace("#", "");
                          if (hex.length === 6) {
                            const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                            const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                            const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                            setCustomDraft(d => ({
                              ...d,
                              secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                              background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                              text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                            }));
                          }
                        }
                      }}
                      style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                        background: specificColors ? "#6FCCDD" : "rgba(255,255,255,0.08)",
                        border: `1.5px solid ${specificColors ? "#6FCCDD" : "rgba(255,255,255,0.25)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {specificColors && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Enter more specific colors</span>
                  </label>

                  {(["primary","secondary","background","text"] as const).map((field) => {
                    const labels: Record<string, string> = { primary: "Primary", secondary: "Secondary", background: "Background", text: "Text" };
                    const disabled = field !== "primary" && !specificColors;
                    return (
                      <div key={field} className="flex items-center gap-[16px]" style={{ opacity: disabled ? 0.35 : 1, transition: "opacity 0.2s" }}>
                        <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
                          <div
                            style={{
                              width: 36, height: 36, borderRadius: 8,
                              background: customDraft[field] || "#333",
                              border: "1px solid rgba(255,255,255,0.15)",
                              cursor: disabled ? "not-allowed" : "pointer",
                            }}
                          />
                          {!disabled && (
                            <input
                              type="color"
                              value={customDraft[field] || "#333333"}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (field === "primary" && !specificColors) {
                                  const hex = val.replace("#","");
                                  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                                  const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                                  const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                                  setCustomDraft(d => ({
                                    ...d,
                                    primary: val,
                                    secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                                    background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                                    text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                      ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                      : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                                  }));
                                } else {
                                  setCustomDraft(d => ({ ...d, [field]: val }));
                                }
                              }}
                              style={{
                                position: "absolute", inset: 0, width: "100%", height: "100%",
                                opacity: 0, cursor: "pointer", border: "none", padding: 0,
                              }}
                              title="Pick a color"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-[4px] flex-1">
                          <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            {labels[field]}
                          </label>
                          <input
                            type="text"
                            value={customDraft[field]}
                            disabled={disabled}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (field === "primary" && !specificColors) {
                                const hex = val.replace("#","");
                                if (hex.length === 6) {
                                  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                                  const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                                  const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                                  setCustomDraft(d => ({
                                    ...d,
                                    primary: val,
                                    secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                                    background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                                    text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                      ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                      : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                                  }));
                                } else {
                                  setCustomDraft(d => ({ ...d, primary: val }));
                                }
                              } else {
                                setCustomDraft(d => ({ ...d, [field]: val }));
                              }
                            }}
                            placeholder="#000000"
                            maxLength={7}
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              color: "white",
                              fontSize: 14,
                              fontFamily: "'Montserrat',sans-serif",
                              fontWeight: 600,
                              padding: "8px 12px",
                              outline: "none",
                              width: "100%",
                              cursor: disabled ? "not-allowed" : "text",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <ValidationError message={customPaletteError} />
                  <div className="flex gap-[12px]">
                    <button
                      onClick={() => setCustomModalOpen(false)}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const validation = customPaletteSchema.safeParse(customDraft);
                        if (!validation.success) {
                          setCustomPaletteError(validation.error.issues[0]?.message ?? "Complete the custom palette.");
                          return;
                        }
                        setCustomPaletteError(undefined);
                        setCustomPalette(validation.data);
                        setSelectedPalette(palettes.length);
                        setCustomModalOpen(false);
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Font Pairings section */}
          <div className="flex flex-col gap-[20px]">
            <span
              className="font-semibold uppercase text-[13px]"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            >
              Font Pairings
            </span>

            {/* Unified responsive grid — 2 cols mobile, 3 tablet, 4 desktop. CSS decides the
                column count (Tailwind breakpoints), not JS device detection. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {fontPairs.map((pair, i) => (
                <FontCard key={i} pair={pair} selected={selectedFont === i} onClick={() => setSelectedFont(i)} />
              ))}
              {/* Custom font card */}
              {(() => {
                const CUSTOM_FONT_IDX = fontPairs.length;
                const selected = selectedFont === CUSTOM_FONT_IDX;
                return (
                  <button
                    onClick={() => {
                      setCustomFontError(undefined);
                      if (customFont) { setFontDraft({ heading: customFont.heading, body: customFont.body }); setHeadingSearch(customFont.heading); setBodySearch(customFont.body); }
                      else { setFontDraft({ heading: "", body: "" }); setHeadingSearch(""); setBodySearch(""); }
                      setFontModalOpen(true);
                    }}
                    className="flex flex-col gap-[10px] p-[16px] text-left"
                    style={{
                      backdropFilter: "blur(12px)",
                      borderRadius: 16,
                      border: selected ? "1px solid #6fccdd" : "1px solid white",
                      background: selected ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <span className="font-semibold uppercase text-[9px] sm:text-[10px]" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Custom</span>
                    {customFont ? (
                      <>
                        <p className="text-white font-bold text-[14px] sm:text-[16px] leading-tight" style={{ fontFamily: `'${customFont.heading}', serif` }}>{customFont.heading}</p>
                        <p className="text-[11px] sm:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: `'${customFont.body}', sans-serif` }}>{customFont.body} — body text</p>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center flex-1 gap-[8px]" style={{ minHeight: 60 }}>
                        {/* Typography icon */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M4 7V4h16v3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 4v16M9 20h6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Choose fonts</span>
                      </div>
                    )}
                  </button>
                );
              })()}
            </div>

            {/* Custom font modal */}
            {fontModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
                onClick={() => setFontModalOpen(false)}
              >
                <div
                  className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[480px] max-h-[90vh] overflow-y-auto"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-[17px]">Custom Font Pairing</span>
                    <button onClick={() => setFontModalOpen(false)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
                  </div>

                  {/* Heading font picker */}
                  {[
                    { label: "Heading Font", searchVal: headingSearch, setSearch: setHeadingSearch, field: "heading" as const },
                    { label: "Body Font",    searchVal: bodySearch,    setSearch: setBodySearch,    field: "body" as const },
                  ].map(({ label, searchVal, setSearch, field }) => {
                    const filtered = GOOGLE_FONTS_LIST.filter(f => f.toLowerCase().includes(searchVal.toLowerCase())).slice(0, 30);
                    return (
                      <div key={field} className="flex flex-col gap-[8px]">
                        <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                        <input
                          type="text"
                          value={searchVal}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search fonts…"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 14, fontFamily: "'Montserrat',sans-serif", padding: "10px 12px", outline: "none", width: "100%" }}
                        />
                        {searchVal && (
                          <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, maxHeight: 180, overflowY: "auto" }}>
                            {filtered.length === 0 ? (
                              <div style={{ padding: "10px 12px", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>No results</div>
                            ) : filtered.map((font) => (
                              <button
                                key={font}
                                onClick={() => { setFontDraft(d => ({ ...d, [field]: font })); setSearch(font); loadGoogleFont(font); }}
                                style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", background: "none", border: "none", color: fontDraft[field] === font ? "#6FCCDD" : "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", fontFamily: `'${font}', sans-serif` }}
                              >
                                {font}
                              </button>
                            ))}
                          </div>
                        )}
                        {fontDraft[field] && (
                          <span style={{ fontSize: 11, color: "#6FCCDD", fontWeight: 600 }}>Selected: {fontDraft[field]}</span>
                        )}
                      </div>
                    );
                  })}

                  {/* Live preview */}
                  {(fontDraft.heading || fontDraft.body) && (
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Montserrat',sans-serif" }}>Preview</p>
                      {fontDraft.heading && <p style={{ fontFamily: `'${fontDraft.heading}', serif`, fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>The Quick Brown Fox</p>}
                      {fontDraft.body && <p style={{ fontFamily: `'${fontDraft.body}', sans-serif`, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Jumps over the lazy dog. Clear, readable body copy for the web.</p>}
                    </div>
                  )}

                  <ValidationError message={customFontError} />
                  <div className="flex gap-[12px]">
                    <button onClick={() => setFontModalOpen(false)} className="flex-1 font-semibold text-[14px]" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}>Cancel</button>
                    <button
                      onClick={() => {
                        const validation = customFontsSchema.safeParse(fontDraft);
                        if (!validation.success) {
                          setCustomFontError(validation.error.issues[0]?.message ?? "Choose both fonts.");
                          return;
                        }
                        setCustomFontError(undefined);
                        const pair: FontPair = { name: "Custom", ...validation.data };
                        setCustomFont(pair);
                        setSelectedFont(fontPairs.length);
                        setFontModalOpen(false);
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", opacity: fontDraft.heading && fontDraft.body ? 1 : 0.5 }}
                    >Apply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ValidationError message={firstValidationError(errors)} />
        </div>
      </div>
    </ScaledPage>
  );
}

function loadGoogleFont(family: string) {
  const id = `gf-${family.replace(/\s+/g, "-")}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }
}

function FontCard({
  pair,
  selected,
  onClick,
}: {
  pair: FontPair;
  selected: boolean;
  onClick: () => void;
}) {
  useEffect(() => {
    loadGoogleFont(pair.heading);
    loadGoogleFont(pair.body);
  }, [pair.heading, pair.body]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-[10px] p-[16px] text-left"
      style={{
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        border: selected ? "1px solid #6fccdd" : "1px solid white",
        background: selected ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span
        className="font-semibold uppercase text-[10px]"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}
      >
        {pair.name}
      </span>
      <p className="text-white font-bold text-[14px] sm:text-[16px] leading-tight" style={{ fontFamily: `'${pair.heading}', serif` }}>
        {pair.heading}
      </p>
      <p className="text-[11px] sm:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: `'${pair.body}', sans-serif` }}>
        {pair.body} — body text
      </p>
    </button>
  );
}







// ─── App Root ─────────────────────────────────────────────────────────────────
const LS_STEP_KEY = "ailk_maxReachedStep";

const LS_PROJECT_KEY = "ailk_projectId";
const LS_OPERATION_KEY = "ailk_operationId";
const WIZARD_PAGES: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages"];
const ACTIVE_BUILD_STATUSES: BuildView["status"][] = [
  "queued",
  "submitting",
  "running",
  "processing_result",
];

function clearProjectSessionState() {
  [LS_PROJECT_KEY, LS_OPERATION_KEY, LS_STEP_KEY].forEach((key) => localStorage.removeItem(key));
}

function resumePageForProject(
  project: ProjectView,
  build: BuildView | null,
  mockups: MockupView[],
): { page: Page; maxReachedStep: number } {
  if (build?.status === "completed") {
    return { page: "download", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (build && ACTIVE_BUILD_STATUSES.includes(build.status)) {
    return { page: "building", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (mockups.length > 0 || project.selectedMockupId) {
    return { page: "preview", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  const hasCompany = Boolean(project.business.companyName.trim());
  if (!hasCompany) {
    return { page: "questionnaire", maxReachedStep: -1 };
  }
  return { page: "questionnaire", maxReachedStep: 0 };
}

export default function App() {
  const [page, setPage] = useState<Page>(() => (hasAccessToken() ? "projects" : "login"));
  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    const saved = localStorage.getItem(LS_STEP_KEY);
    return saved === null ? -1 : Number.parseInt(saved, 10);
  });
  const [catalog, setCatalog] = useState<WizardCatalog | null>(null);
  const [project, setProject] = useState<ProjectView | null>(null);
  const [projects, setProjects] = useState<ProjectSummaryView[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [operation, setOperation] = useState<OperationView | null>(null);
  const [mockups, setMockups] = useState<MockupView[]>([]);
  const [build, setBuild] = useState<BuildView | null>(null);
  const [deployment, setDeployment] = useState<DeploymentView | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  const go = useCallback((next: Page) => {
    setPage(next);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_STEP_KEY, String(maxReachedStep));
  }, [maxReachedStep]);

  const refreshProject = async (projectId: string) => {
    const refreshed = await launchKitApi.getProject(projectId);
    setProject(refreshed);
    return refreshed;
  };

  const refreshProjects = async () => {
    setProjectsLoading(true);
    try {
      setProjects(await launchKitApi.listProjects());
    } finally {
      setProjectsLoading(false);
    }
  };

  const clearActiveProject = () => {
    clearProjectSessionState();
    setProject(null);
    setOperation(null);
    setMockups([]);
    setBuild(null);
    setDeployment(null);
    setMaxReachedStep(-1);
  };

  useEffect(() => {
    let cancelled = false;
    const boot = async () => {
      // Returning from the Innovation City OAuth redirect (?auth=success/error).
      const params = new URLSearchParams(window.location.search);
      const authStatus = params.get("auth");
      if (authStatus) {
        const reason = params.get("reason");
        params.delete("auth");
        params.delete("reason");
        const query = params.toString();
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}${query ? `?${query}` : ""}`,
        );
        if (authStatus === "success") {
          try {
            const session = await fetchInnovationCityApiToken();
            setAccessToken(session.accessToken);
          } catch {
            if (!cancelled) setError("Sign-in could not be completed. Please try again.");
          }
        } else if (authStatus === "error") {
          if (!cancelled) {
            setError(reason ? `Sign-in failed: ${reason}` : "Sign-in failed. Please try again.");
          }
        }
      }

      if (!hasAccessToken()) {
        // Cookie-only IC session: mint/store Bearer so /api/v1 works after refresh.
        try {
          const session = await fetchInnovationCityApiToken();
          if (cancelled) return;
          setAccessToken(session.accessToken);
        } catch {
          setPage("login");
          if (!cancelled) setBooting(false);
          try {
            const loadedCatalog = await launchKitApi.getCatalog();
            if (!cancelled) setCatalog(loadedCatalog);
          } catch {
            // Catalog is only required after sign-in; login still works without it.
          }
          return;
        }
      }

      try {
        const loadedCatalog = await launchKitApi.getCatalog();
        if (cancelled) return;
        setCatalog(loadedCatalog);
        go("projects");
        setProjects(await launchKitApi.listProjects());
      } catch (cause) {
        if (cause instanceof LaunchKitApiError && cause.status === 401) {
          clearAccessToken();
          setPage("login");
          setError("Your staging session expired. Sign in again to continue.");
          return;
        }
        setError(cause instanceof Error ? cause.message : "Could not load your projects.");
        go("projects");
      } finally {
        if (!cancelled) setBooting(false);
      }
    };
    void boot();
    return () => { cancelled = true; };
  }, [go]);

  useEffect(() => {
    if (build?.status === "completed" && page === "building") go("download");
  }, [build?.status, page, go]);

  useEffect(() => {
    if (!build || !ACTIVE_BUILD_STATUSES.includes(build.status)) return;

    const controller = new AbortController();
    void watchBuild(
      build,
      (next) => {
        if (controller.signal.aborted) return;
        setBuild(next);
        setError(null);
      },
      controller.signal,
    ).catch((cause) => {
      if (controller.signal.aborted) return;
      if (cause instanceof LaunchKitApiError && cause.status === 401) {
        clearAccessToken();
        setPage("login");
      }
      setError(cause instanceof Error ? cause.message : "Build status could not be refreshed.");
    });
    return () => controller.abort();
  }, [build?.id]);

  const perform = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (cause) {
      if (cause instanceof LaunchKitApiError && cause.status === 401) {
        clearAccessToken();
        setPage("login");
      }
      setError(cause instanceof Error ? cause.message : "The request could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  const ensureProject = async () => {
    if (project) return project;
    const savedProjectId = localStorage.getItem(LS_PROJECT_KEY);
    if (savedProjectId) {
      try {
        const savedProject = await launchKitApi.getProject(savedProjectId);
        setProject(savedProject);
        return savedProject;
      } catch (cause) {
        if (!(cause instanceof LaunchKitApiError) || cause.status !== 404) throw cause;
        localStorage.removeItem(LS_PROJECT_KEY);
      }
    }
    throw new LaunchKitApiError(
      "Create or open a website from your projects list first.",
      400,
      "project_required",
    );
  };

  const signIn = () => {
    beginInnovationCityLogin();
  };

  const createWebsite = () => perform(async () => {
    clearActiveProject();
    try {
      const created = await launchKitApi.createProject();
      localStorage.setItem(LS_PROJECT_KEY, created.id);
      setProject(created);
      setMaxReachedStep(-1);
      go("questionnaire");
    } catch (cause) {
      if (cause instanceof LaunchKitApiError && cause.code === "generation_quota_exceeded") {
        setError(cause.message);
        await refreshProjects();
        go("projects");
        return;
      }
      throw cause;
    }
  });

  const openProject = (projectId: string) => perform(async () => {
    const loadedProject = await launchKitApi.getProject(projectId);
    localStorage.setItem(LS_PROJECT_KEY, loadedProject.id);
    localStorage.removeItem(LS_OPERATION_KEY);
    setProject(loadedProject);
    setOperation(null);
    const loadedMockups = await launchKitApi.getMockups(projectId);
    setMockups(loadedMockups);
    let loadedBuild: BuildView | null = null;
    if (loadedProject.latestBuildId) {
      loadedBuild = await launchKitApi.getBuild(loadedProject.latestBuildId);
      setBuild(loadedBuild);
    } else {
      setBuild(null);
    }
    if (loadedProject.latestDeploymentId) {
      setDeployment(await launchKitApi.getDeployment(loadedProject.latestDeploymentId));
    } else {
      setDeployment(null);
    }
    const resume = resumePageForProject(loadedProject, loadedBuild, loadedMockups);
    setMaxReachedStep(resume.maxReachedStep);
    go(resume.page);
  });

  const returnToProjects = () => perform(async () => {
    clearActiveProject();
    await refreshProjects();
    go("projects");
  });

  const signOut = () => {
    void innovationCityLogout();
    clearAccessToken();
    clearActiveProject();
    setProjects([]);
    setError(null);
    go("login");
  };

  const saveBusiness = (form: QuestionnaireForm) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      business: {
        companyName: form.companyName,
        uvp: form.uniqueness,
        targetAudience: form.customers,
        notes: form.anythingElse,
      },
      design: { tagline: form.tagline, cta: form.cta },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(1, maxReachedStep));
    go("category-mood");
  });

  const uploadProfile = (file: File) => perform(async () => {
    const current = await ensureProject();
    const queued = await launchKitApi.uploadProfile(current.id, file);
    setOperation(queued);
    await waitForOperation(queued.id, setOperation);
    await refreshProject(current.id);
  });

  const saveDesign = (categoryId: string, moodId: string, animationId: string) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      business: { categoryId },
      design: { moodId, animationId },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(2, maxReachedStep));
    go("colors");
  });

  const saveColors = (
    paletteId: string,
    customPalette: CustomPalette | null,
    fontPairingId: string,
    customFonts: { heading: string; body: string } | null,
  ) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      design: { paletteId, customPalette, fontPairingId, customFonts },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(3, maxReachedStep));
    go("pick-pages");
  });

  const generateMockups = (layout: PageLayout) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, { pageLayout: layout });
    setProject(updated);
    go("generating");
    const queued = await launchKitApi.createMockups(current.id, createIdempotencyKey("mockups"));
    localStorage.setItem(LS_OPERATION_KEY, queued.id);
    setOperation(queued);
    await waitForOperation(queued.id, setOperation);
    localStorage.removeItem(LS_OPERATION_KEY);
    setMockups(await launchKitApi.getMockups(current.id));
    await refreshProject(current.id);
    go("preview");
  });

  const startBuild = (mockupId: string) => perform(async () => {
    const current = await ensureProject();
    await launchKitApi.selectMockup(current.id, mockupId);
    const queued = await launchKitApi.createBuild(current.id, createIdempotencyKey("build"));
    setProject({ ...current, selectedMockupId: mockupId, latestBuildId: queued.id });
    setBuild(queued);
    go("building");
  });

  const deploy = async () => {
    if (!build) return;
    if (deployment?.status === "ready_to_claim" && deployment.claimUrl) {
      window.open(deployment.claimUrl, "_blank", "noopener,noreferrer");
      return;
    }
    await perform(async () => {
      const queued = await launchKitApi.createDeployment(build.id, createIdempotencyKey("deployment"));
      setDeployment(queued);
      await waitForDeployment(queued.id, setDeployment);
    });
  };

  const goBack = () => {
    if (page === "questionnaire") {
      void returnToProjects();
      return;
    }
    const order: Page[] = ["login", "projects", ...WIZARD_PAGES, "generating", "preview", "building", "download"];
    const index = order.indexOf(page);
    if (index > 0) go(order[index - 1]);
  };

  const goToStep = (step: number) => {
    const target = WIZARD_PAGES[step];
    if (!target) return;
    if (WIZARD_PAGES.indexOf(target) <= WIZARD_PAGES.indexOf(page)) go(target);
  };

  const currentStep = WIZARD_PAGES.indexOf(page);
  const completedUpTo = Math.max(maxReachedStep, currentStep - 1);
  const isAuthPage = page === "login";
  const isHubPage = page === "projects";
  const needsProject = !isAuthPage && !isHubPage;
  const needsCatalog = needsProject;

  if (!isAuthPage && !isHubPage && (booting || (needsCatalog && !catalog) || (needsProject && !project))) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#0b0b0b" }}>
        <Spinner size={48} borderWidth={3} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#0b0b0b", display: "flex", justifyContent: "center", alignItems: "stretch" }}>
      <div style={{ width: "100%", maxWidth: 1440, minHeight: "100vh", margin: "0 auto", display: "flex", flexDirection: "column" }}>
        {page === "login" && <LoginPage onNext={signIn} busy={busy} />}
        <ErrorToast message={error} onDismiss={() => setError(null)} />
        {page === "projects" && (
          <ProjectsPage
            projects={projects}
            loading={projectsLoading || booting}
            busy={busy}
            onCreate={createWebsite}
            onOpen={openProject}
            onRefresh={refreshProjects}
            onSignOut={signOut}
          />
        )}
        {page === "questionnaire" && project && <QuestionnairePage project={project} onSave={saveBusiness} onUpload={uploadProfile} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "category-mood" && project && catalog && <CategoryMoodPage project={project} catalog={catalog} onSave={saveDesign} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "colors" && project && catalog && <ColorsFontsPage project={project} catalog={catalog} onSave={saveColors} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "pick-pages" && project && catalog && <PickPagesPage project={project} catalog={catalog} onGenerate={generateMockups} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "generating" && <GeneratingPage operation={operation} error={error} onRetry={() => project && void generateMockups(project.pageLayout)} />}
        {page === "preview" && project && <PreviewPage mockups={mockups} selectedMockupId={project.selectedMockupId} onConfirm={startBuild} busy={busy} onBack={() => go("pick-pages")} />}
        {page === "building" && <BuildingPage build={build} error={error} onBack={() => go("preview")} />}
        {page === "download" && build?.status === "completed" && <DownloadPage build={build} deployment={deployment} onDeploy={deploy} busy={busy} onBack={() => { void returnToProjects(); }} />}
      </div>
    </div>
  );
}
