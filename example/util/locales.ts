import { SupportedLanguage } from "../../src/types/types";

type AppLocale = Record<SupportedLanguage, string>;

const themeString: AppLocale = {
    en: 'Theme',
    ru: 'Тема',
    ar: 'الموضوع',
    fr: 'Thème',
    de: 'Thema',
    es: 'Tema',
    pt: 'Thema',
    pl: 'Temat',
    ro: 'Temă',
    zh: '主题',
    ja: 'テーマ',
    ko: '테마',
}

const langString: AppLocale = {
    en: 'Language',
    ru: 'Язык',
    ar: 'لغة',
    fr: 'Langue',
    de: 'Sprache',
    es: 'Idioma',
    pt: 'Língua',
    pl: 'Język',
    ro: 'Limba',
    zh: '语言',
    ja: '言語',
    ko: '언어',
}

const noColor: AppLocale = {
    en: 'No color value is set!',
    ru: 'Значение цвета не задано!',
    ar: 'لم يتم تعيين أي قيمة لون',
    fr: 'Aucune valeur de couleur n\'est définie!',
    de: 'Es ist kein Farbwert eingestellt!',
    es: 'No se ha establecido ningún valor de color!',
    pt: 'Não está definido nenhum valor de cor!',
    pl: 'Nie ustawiono wartości koloru!',
    ro: 'Valoare culorii nu este definită!',
    zh: '未设置颜色值！',
    ja: 'カラー値が設定されていない！',
    ko: '색상 값이 설정되지 않았습니다!',
}

const invalidColor: AppLocale = {
    en: 'The "%" value is not a valid color!',
    ru: 'Значение "%" не является допустимым цветом!',
    ar: 'القيمة ليست لونا صالحا',
    fr: 'La valeur "%" n\'est pas une couleur valide!',
    de: 'Der Wert "%" ist keine gültige Farbe!',
    es: 'El valor "%" no es un color válido.',
    pt: 'O valor "%" não é uma cor válida!',
    pl: 'Wartość "%" nie jest prawidłowym kolorem!',
    ro: 'Valoarea "%" nu este o culoare validă!',
    zh: '%"值不是有效颜色！',
    ja: '"%" は有効な色ではありません！',
    ko: '"%" 값은 유효한 색상이 아닙니다!',
}

const invalidLabel: AppLocale = {
    en: 'The "%" label already exists!',
    ru: 'Метка "%" уже существует!',
    ar: 'التسمية موجودة بالفعل',
    fr: 'L\'étiquette "%" existe déjà!',
    de: 'Die Bezeichnung "%" existiert bereits!',
    es: 'La etiqueta "%" ya existe.',
    pt: 'A etiqueta "%" já existe!',
    pl: 'Etykieta "%" już istnieje!',
    ro: 'Eticheta "%" deja există!',
    zh: '"%"标签已经存在！',
    ja: 'ラベル"%"は既に存在します！',
    ko: '"%" 레이블이 이미 존재합니다!',
}

const colorPaletteStrings: AppLocale = {
    en: 'Colour Palette',
    ru: 'Палитра цветов',
    ar: 'لوحة الألوان',
    fr: 'Palette de couleurs',
    de: 'Farbpalette',
    es: 'Paleta de colores',
    pt: 'Paleta de cores',
    pl: 'Paleta kolorów',
    ro: 'Paletă de culori',
    zh: '调色板',
    ja: 'カラーパレット',
    ko: '색상 팔레트',
}

const colorLabelStrings: AppLocale = {
    en: 'Colour Label',
    ru: 'Цветная этикетка',
    ar: 'تسمية اللون',
    fr: 'Étiquette de couleur',
    de: 'Farbe Etikett',
    es: 'Etiqueta de color',
    pt: 'Paleta de cor',
    pl: 'Kolorowa etykieta',
    ro: 'Nume culoare',
    zh: '颜色标签',
    ja: 'カラーラベル',
    ko: '컬러 라벨',
}

const colorValueStrings: AppLocale = {
    en: 'Colour Value',
    ru: 'Значение цвета',
    ar: 'قيمة اللون',
    fr: 'Valeur de la couleur',
    de: 'Farbe Wert',
    es: 'Valor cromático',
    pt: 'Valor da cor',
    pl: 'Wartość koloru',
    ro: 'Valoare culoare',
    zh: '颜色值',
    ja: 'カラーバリュー',
    ko: '색상 값',
}

const hueStepsStrings: AppLocale = {
    en: 'Hue Steps',
    ru: 'Ступени оттенка',
    ar: 'خطوات هوى',
    fr: 'Les marches de la teinte',
    de: 'Farbton-Schritte',
    es: 'Pasos de tinte',
    pt: 'Etapas da tonalidade',
    pl: 'Kroki Hue',
    ro: 'Trepte de culoare',
    zh: '色调步骤',
    ja: '色相ステップ',
    ko: '색조 단계',
}

const lightStepsStrings: AppLocale = {
    en: 'Light Steps',
    ru: 'Легкие шаги',
    ar: 'خطوات خفيفة',
    fr: 'Marches légères',
    de: 'Leichte Schritte',
    es: 'Pasos ligeros',
    pt: 'Passos ligeiros',
    pl: 'Lekkie kroki',
    ro: 'Trepte de luminozitate',
    zh: '轻型台阶',
    ja: 'ライトステップ',
    ko: '가벼운 걸음',
}



const getLocale = (lang: SupportedLanguage) => ({
    palette: colorPaletteStrings[lang],
    hueSteps: hueStepsStrings[lang],
    ligthSteps: lightStepsStrings[lang],
    label: colorLabelStrings[lang],
    value: colorValueStrings[lang],
    invalidColor: invalidColor[lang],
    invalidLabel: invalidLabel[lang],
    noColor: noColor[lang],
    theme: themeString[lang],
    language: langString[lang],
});

export default getLocale;
