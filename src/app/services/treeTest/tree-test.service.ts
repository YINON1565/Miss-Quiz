import { Injectable } from '@angular/core';
import { TestTree } from 'src/app/interfaces/test-tree';
import { DateService } from '../date/date.service';

@Injectable({
  providedIn: 'root',
})
export class TreeTestService {
  constructor(private _date: DateService) {}
  public getRandomTags(): string[] {
    const tags: string[] = this.getTags();
    return tags.filter((tag: string) => tag);
  }

  public getTags(): string[] {
    return [];
  }

  private _getArrayByNumber(num: number, prefix: string = ''): TestTree[] {
    return Array(num)
      .fill(0)
      .map((x, i) => ({
        value: i,
        name: {he: prefix + ' ' + this._date.gimatriaCalculate(i + 1, false, true) ,en: i+1},
        children: prefix === 'דף'? this._getArrayByNumber(2, 'עמוד') : null,
      }))
  }

  public getTreeTest() : TestTree[] {
    return [
      {
        value: 'tanach',
        name: { en: 'Tanach', he: 'תנ"ך' },
        children: [
          {
            value: 'bereshit',
            name: { en: 'Bereshit', he: 'בראשית' },
            children: this._getArrayByNumber(50, 'פרק'),
          },
          {
            value: 'se-nmot',
            name: { en: 'Se-nmot', he: 'שמות' },
            children: this._getArrayByNumber(40, 'פרק'),
          },
          {
            value: 'vayikra',
            name: { en: 'Vayikra', he: 'ויקרא' },
            children: this._getArrayByNumber(27, 'פרק'),
          },
          {
            value: 'bamidbar',
            name: { en: 'Bamidbar', he: 'במדבר' },
            children: this._getArrayByNumber(36, 'פרק'),
          },
          {
            value: 'devarim',
            name: { en: 'Devarim', he: 'דברים' },
            children: this._getArrayByNumber(34, 'פרק'),
          },
          {
            value: 'yehoshua',
            name: { en: 'Yehoshua', he: 'יהושע' },
            children: this._getArrayByNumber(24, 'פרק'),
          },
          {
            value: 'shoftim',
            name: { en: 'Shoftim', he: 'שופטים' },
            children: this._getArrayByNumber(21, 'פרק'),
          },
          {
            value: 'shmuel',
            name: { en: 'Shmuel', he: 'שמואל' },
            children: [
              {
                value: 'shmuel_I',
                name: { en: 'Shmuel I', he: 'שמואל א' },
                children: this._getArrayByNumber(31, 'פרק'),
              },
              {
                value: 'shmuel_II',
                name: { en: 'Shmuel II', he: 'שמואל ב' },
                children: this._getArrayByNumber(24, 'פרק'),
              },
            ],
          },
          {
            value: 'melachim',
            name: { en: 'Melachim', he: 'מלכים' },
            children: [
              {
                value: 'melachim_I',
                name: { en: 'Melachim I', he: 'מלכים א' },
                children: this._getArrayByNumber(22, 'פרק'),
              },
              {
                value: 'melachim_II',
                name: { en: 'Melachim II', he: 'מלכים ב' },
                children: this._getArrayByNumber(25, 'פרק'),
              },
            ],
          },
          {
            value: 'yishayahu',
            name: { en: 'Yishayahu', he: 'ישעיה' },
            children: this._getArrayByNumber(66, 'פרק'),
          },
          {
            value: 'yirmiyahu',
            name: { en: 'Yirmiyahu', he: 'ירמיה' },
            children: this._getArrayByNumber(52, 'פרק'),
          },
          {
            value: 'yece-nzkel',
            name: { en: 'Yece-nzkel', he: 'יחזקאל' },
            children: this._getArrayByNumber(48, 'פרק'),
          },
          {
            value: 'treiAsar',
            name: { en: 'Trei Asar', he: 'תרי עשר' },
            children: [
              {
                value: 'hose-na',
                name: { en: 'Hose-na', he: 'הושע' },
                children: this._getArrayByNumber(14, 'פרק'),
              },
              {
                value: 'joel',
                name: { en: 'Joel', he: 'יואל' },
                children: this._getArrayByNumber(4, 'פרק'),
              },
              {
                value: 'amos',
                name: { en: 'Amos', he: 'עמוס' },
                children: this._getArrayByNumber(9, 'פרק'),
              },
              {
                value: 'ovadia',
                name: { en: 'Ovadia', he: 'עובדיה' },
                children: this._getArrayByNumber(1, 'פרק'),
              },
              {
                value: 'jonah',
                name: { en: 'Jonah', he: 'יונה' },
                children: this._getArrayByNumber(4, 'פרק'),
              },
              {
                value: 'micha',
                name: { en: 'Micha', he: 'מיכה' },
                children: this._getArrayByNumber(7, 'פרק'),
              },
              {
                value: 'nachum',
                name: { en: 'Nachum', he: 'נחום' },
                children: this._getArrayByNumber(3, 'פרק'),
              },
              {
                value: 'chavakuk',
                name: { en: 'Chavakuk', he: 'חבקוק' },
                children: this._getArrayByNumber(3, 'פרק'),
              },
              {
                value: 'tzefania',
                name: { en: 'Tzefania', he: 'צפניה' },
                children: this._getArrayByNumber(3, 'פרק'),
              },
              {
                value: 'chagai',
                name: { en: 'Chagai', he: 'חגי' },
                children: this._getArrayByNumber(2, 'פרק'),
              },
              {
                value: 'zecharia',
                name: { en: 'Zecharia', he: 'זכריה' },
                children: this._getArrayByNumber(14, 'פרק'),
              },
              {
                value: 'malachi',
                name: { en: 'Malachi', he: 'מלאכי' },
                children: this._getArrayByNumber(3, 'פרק'),
              },
            ],
          },
          {
            value: 'mishlei',
            name: { en: 'Tehillim', he: 'תהילים' },
            children: this._getArrayByNumber(150, 'פרק'),
          },
          {
            value: 'mishlei',
            name: { en: 'Mishlei', he: 'משלי' },
            children: this._getArrayByNumber(31, 'פרק'),
          },
          {
            value: 'iyov',
            name: { en: 'Iyov', he: 'איוב' },
            children: this._getArrayByNumber(42, 'פרק'),
          },
          {
            value: 'shirHashirim',
            name: { en: 'Shir Hashirim', he: 'שיר השירים' },
            children: this._getArrayByNumber(8, 'פרק'),
          },
          {
            value: 'ruth',
            name: { en: 'Ruth', he: 'רות' },
            children: this._getArrayByNumber(4, 'פרק'),
          },
          {
            value: 'eycha',
            name: { en: 'Eycha', he: 'איכה' },
            children: this._getArrayByNumber(5, 'פרק'),
          },
          {
            value: 'koe-nlet',
            name: { en: 'Koe-nlet', he: 'קהלת' },
            children: this._getArrayByNumber(12, 'פרק'),
          },
          {
            value: 'este-nr',
            name: { en: 'Este-nr', he: 'אסתר' },
            children: this._getArrayByNumber(10, 'פרק'),
          },
          {
            value: 'daniel',
            name: { en: 'Daniel', he: 'דניאל' },
            children: this._getArrayByNumber(12, 'פרק'),
          },
          {
            value: 'ezra',
            name: { en: 'Ezra', he: 'עזרא' },
            children: this._getArrayByNumber(10, 'פרק'),
          },
          {
            value: 'nece-nmya',
            name: { en: 'Nece-nmya', he: 'נחמיה' },
            children: this._getArrayByNumber(13, 'פרק'),
          },
          {
            value: 'divreiHayamim',
            name: { en: 'Divrei Hayamim', he: 'דברי הימים' },
            children: [
              {
                value: 'divreiHayamim_I',
                name: { en: 'Divrei Hayamim I', he: 'דברי הימים א' },
                children: this._getArrayByNumber(29, 'פרק'),
              },
              {
                value: 'divreiHayamim_II',
                name: { en: 'Divrei Hayamim II', he: 'דברי הימים ב' },
                children: this._getArrayByNumber(36, 'פרק'),
              },
            ],
          },
        ],
      },
      {
        value: 'talmud',
        name: { en: 'Talmud', he: 'תלמוד' },
        children: [
          {
            value: 'berachot',
            name: { en: 'Berachot', he: 'ברכות' },
            children: this._getArrayByNumber(64, 'דף'),
          },
          {
            value: 'shabbat',
            name: { en: 'Shabbat', he: 'שבת' },
            children: this._getArrayByNumber(157, 'דף'),
          },
          {
            value: 'eruvin',
            name: { en: 'Eruvin', he: 'עירובין' },
            children: this._getArrayByNumber(105, 'דף'),
          },
          {
            value: 'pesachim',
            name: { en: 'Pesachim', he: 'פסחים' },
            children: this._getArrayByNumber(121, 'דף'),
          },
          {
            value: 'se-nkalim',
            name: { en: 'Se-nkalim', he: 'שקלים' },
            children: this._getArrayByNumber(22, 'דף'),
          },
          {
            value: 'yoma',
            name: { en: 'Yoma', he: 'יומא' },
            children: this._getArrayByNumber(88, 'דף'),
          },
          {
            value: 'sukkah',
            name: { en: 'Sukkah', he: 'סוכה' },
            children: this._getArrayByNumber(56, 'דף'),
          },
          {
            value: 'beitzah',
            name: { en: 'Beitzah', he: 'ביצה' },
            children: this._getArrayByNumber(40, 'דף'),
          },
          {
            value: 'roshHashana',
            name: { en: 'Rosh Hashana', he: 'ראש השנה' },
            children: this._getArrayByNumber(35, 'דף'),
          },
          {
            value: 'taanit',
            name: { en: 'Taanit', he: 'תענית' },
            children: this._getArrayByNumber(31, 'דף'),
          },
          {
            value: 'megillah',
            name: { en: 'Megillah', he: 'מגילה' },
            children: this._getArrayByNumber(32, 'דף'),
          },
          {
            value: 'moed',
            name: { en: 'Moed Katan', he: 'מועד קטן' },
            children: this._getArrayByNumber(29, 'דף'),
          },
          {
            value: 'chagigah',
            name: { en: 'Chagigah', he: 'חגיגה' },
            children: this._getArrayByNumber(27, 'דף'),
          },
          {
            value: 'yevamot',
            name: { en: 'Yevamot', he: 'יבמות' },
            children: this._getArrayByNumber(122, 'דף'),
          },
          {
            value: 'ketubot',
            name: { en: 'Ketubot', he: 'כתובות' },
            children: this._getArrayByNumber(112, 'דף'),
          },
          {
            value: 'nedarim',
            name: { en: 'Nedarim', he: 'נדרים' },
            children: this._getArrayByNumber(91, 'דף'),
          },
          {
            value: 'nazir',
            name: { en: 'Nazir', he: 'נזיר' },
            children: this._getArrayByNumber(66, 'דף'),
          },
          {
            value: 'sotah',
            name: { en: 'Sotah', he: 'סוטה' },
            children: this._getArrayByNumber(49, 'דף'),
          },
          {
            value: 'gitin',
            name: { en: 'Gitin', he: 'גיטין' },
            children: this._getArrayByNumber(90, 'דף'),
          },
          {
            value: 'kiddushin',
            name: { en: 'Kiddushin', he: 'קידושין' },
            children: this._getArrayByNumber(82, 'דף'),
          },
          {
            value: 'babaKamma',
            name: { en: 'Baba Kamma', he: 'בבא קמא' },
            children: this._getArrayByNumber(119, 'דף'),
          },
          {
            value: 'babaMetzia',
            name: { en: 'Baba Metzia', he: 'בבא מציעא' },
            children: this._getArrayByNumber(119, 'דף'),
          },
          {
            value: 'babaBatra',
            name: { en: 'Baba Batra', he: 'בבא בתרא' },
            children: this._getArrayByNumber(176, 'דף'),
          },
          {
            value: 'sane-ndrin',
            name: { en: 'Sane-ndrin', he: 'סנהדרין' },
            children: this._getArrayByNumber(113, 'דף'),
          },
          {
            value: 'makkot',
            name: { en: 'Makkot', he: 'מכות' },
            children: this._getArrayByNumber(24, 'דף'),
          },
          {
            value: 'se-nvuot',
            name: { en: 'Se-nvuot', he: 'שבועות' },
            children: this._getArrayByNumber(49, 'דף'),
          },
          {
            value: 'avodahZarah',
            name: { en: 'Avodah Zarah', he: 'עבודה זרה' },
            children: this._getArrayByNumber(76, 'דף'),
          },
          {
            value: 'horayot',
            name: { en: 'Horayot', he: 'הוריות' },
            children: this._getArrayByNumber(14, 'דף'),
          },
          {
            value: 'zevachim',
            name: { en: 'Zevachim', he: 'זבחים' },
            children: this._getArrayByNumber(120, 'דף'),
          },
          {
            value: 'menachot',
            name: { en: 'Menachot', he: 'מנחות' },
            children: this._getArrayByNumber(110, 'דף'),
          },
          {
            value: 'chullin',
            name: { en: 'Chullin', he: 'חולין' },
            children: this._getArrayByNumber(142, 'דף'),
          },
          {
            value: 'bechorot',
            name: { en: 'Bechorot', he: 'בכורות' },
            children: this._getArrayByNumber(61, 'דף'),
          },
          {
            value: 'arachin',
            name: { en: 'Arachin', he: 'ערכין' },
            children: this._getArrayByNumber(34, 'דף'),
          },
          {
            value: 'temurah',
            name: { en: 'Temurah', he: 'תמורה' },
            children: this._getArrayByNumber(34, 'דף'),
          },
          {
            value: 'keritot',
            name: { en: 'Keritot', he: 'כריתות' },
            children: this._getArrayByNumber(28, 'דף'),
          },
          {
            value: 'meilah',
            name: { en: 'Meilah', he: 'מעילה' },
            children: this._getArrayByNumber(22, 'דף'),
          },
          {
            value: 'kinnim',
            name: { en: 'Kinnim', he: 'קנים' },
            children: this._getArrayByNumber(4, 'דף'),
          },
          {
            value: 'tamid',
            name: { en: 'Tamid', he: 'תמיד' },
            children: this._getArrayByNumber(10, 'דף'),
          },
          {
            value: 'midot',
            name: { en: 'Midot', he: 'מדות' },
            children: this._getArrayByNumber(4, 'דף'),
          },
          {
            value: 'niddah',
            name: { en: 'Niddah', he: 'נדה' },
            children: this._getArrayByNumber(73, 'דף'),
          },
        ],
      },
    ];
  }
}
