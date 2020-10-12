import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }


public getMonths() {
  return {
    he: {
      he: [
        "תשרי",
        "חשוון",
        "כסלו",
        "טבת",
        "שבט",
        "אדר",
        "ניסן",
        "אייר",
        "סיוון",
        "תמוז",
        "אב",
        "אלול",
      ],
      en: [
        "Tishri",
        "Heshvan",
        "Kislev",
        "Tevet",
        "Shevat",
        "Adar",
        "Nisan",
        "Iyar",
        "Sivan",
        "Tamuz",
        "Av",
        "Elul",
      ],
    },
    en: {
      he: [
        "ינואר",
        "פבואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
      ],
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "Novemeber",
        "Decemeber"
      ]
    }
  }
}

public getDays() {
  return {
    he: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }
}

public getHebrewCalander(date, isWithPrefix = true, isWithApostrophes = true, isGimatriaCalculate = true) {
  const regNonDigit = /[^0-9]/
  const  locale  = 'he'
  // const { locale } = i18n
  const heDate = new Date(date).toLocaleDateString(`${locale}-u-ca-hebrew`).replace(/באדר א/g, "באדר-א").replace(/באדר ב/g, "באדר-ב").replace(/Adar I/g, "Adar-I")
  const dateParams = heDate.split(' ').map(param => regNonDigit.test(param) ? locale === 'he' ? param.replace(/-/g, " ").substr(1) : param.replace(/-/g, " ") : +param)
  return isGimatriaCalculate && locale === 'he'
    ? [this.gimatriaCalculate(dateParams[0], isWithPrefix, isWithApostrophes), dateParams[1], this.gimatriaCalculate(dateParams[2], isWithPrefix, isWithApostrophes)]
    : dateParams;
}

public gimatriaCalculate(num, isWithPrefix = true, isWithApostrophes = true) {
  num = Math.floor(isWithPrefix ? num : num % 1000);

  if (num >= 1000)
    return this.gimatriaCalculate(Math.floor(num / 1000)) + "'" + this.gimatriaCalculate(num % 1000);

  var s1 = ["", "ק", "ר", "ש", "ת", "תק", "תר", "תש", "תת", "תתק"];
  var s2 = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
  var s3 = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];

  var gimatria =
    s1[Math.floor(num / 100)] +
    s2[Math.floor((num % 100) / 10)] +
    s3[num % 10];

  gimatria = String(gimatria)
    .replace(/יה/g, "טו")
    .replace(/יו/g, "טז");
  if (isWithApostrophes) {
    if (gimatria.length > 1) gimatria = gimatria.slice(0, -1) + '"' + gimatria.slice(-1);
  }
  if ((gimatria.length === 0 || gimatria === 'Na"N' || gimatria == 'NaN'))
    gimatria = num == 0 ? "אפס" : "לא ניתן לחישוב";
  return gimatria;
}

public getNewDate() {
  return { date: this._getValidDate(new Date()), time: this._getValidtime(new Date()) };
}

private _getValidDate(date) {
  return (
    date.getFullYear() +
    "-" +
    this._padNum(date.getMonth() + 1) +
    "-" +
    this._padNum(date.getDate())
  );
}

private _getValidtime(time) {
  return this._padNum(time.getHours()) + ":" + this._padNum(time.getMinutes());
}

private _padNum(num) {
  return num < 10 ? "0" + num : num;
}

}
