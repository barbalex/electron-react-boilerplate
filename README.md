# Kapla #

## Projektbeschreibung ##

Mit Kapla verwaltet die Abteilung Recht des AWEL (Amt für Abfall, Wasser, Energie und Luft) des Kantons Zürich ihre Geschäfte.

Erfasst werden:

- Rechtsgeschäfte
- Rekurse, Beschwerden
- Parlamentarische Vorstösse
- Vernehmlassungen und Anhörungen
- Strafverfahren von besonderem Interesse

Kapla gibt eine Übersicht über:

- alle Geschäfte,
- den aktuellen Stand der Bearbeitung,
- wer sie bearbeitet,
- wo die Akten liegen,
- Fristen

Mehr Info hier: [Projektbeschreibung.pdf](https://github.com/barbalex/kapla3/raw/master/app/etc/Projektbeschreibung.pdf)

## Technische Umsetzung

Kapla löst ein FileMaker Projekt ab.
Es ist in JavaScript geschrieben und benutzt unter anderem:

- [sqlite](http://sqlite.org): simpler lagern Daten nimmer :-)
- [electron](http://electron.atom.io): JavaScript-Anwendung lokal installieren
- [nodejs](https://nodejs.org): JavaScript kann auch mit dem PC kommunizieren
- [React](https://facebook.github.io/react): die Benutzeroberfläche ist eine Funktion der Anwendungs-Daten! Und erst noch modularisiert
- [MobX](https://github.com/mobxjs/mobx): Anwendungs-Daten managen wie ein Profi
- [styled components](https://github.com/styled-components/styled-components): Styling für Module
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid): anspruchsvolle Layouts gestalten

Ich will diese Kombination nachfolgend der Einfachheit halber "electron-Anwendung" nennen.

### Unterschiede gegenüber FileMaker bzw. Access-Anwendungen

Für die BenutzerInnen:

- die Benutzeroberfläche kann so einfach und intuitiv gebaut werden, wie es das Budget und das Knowhow des Entwicklers zulassen. Im Gegensatz zu Access und FileMaker gibt es kaum Einschränkungen
- beispielsweise wäre die in Kapla verwendete Kombination von Listen- und Detailansicht mit Access in dieser Art nicht möglich gewesen

Im Betrieb:

- installiert wird die Anwendung wahlweise durch simples Kopieren eines Dateiordners oder mit Hilfe einer Installations-Routine
- electron-Anwendung und sqlite-Datei bringen alles mit: Ausser dem Betriebssystem gibt es keine Software-Abhängigkeiten!
- electron-Anwendung und sqlite-Datei funktionieren auf allen aktuellen 64bit-Versionen von Windows. Daher kann man davon ausgehen, dass sie noch längere Zeit unverändert weiter benutzt werden können
- electron-Anwendungen können so gebaut werden, dass sie sich bei Vorliegen eines Updates automatisch aktualisieren
- es wird ausschliesslich open source Software verwendet. Daher fallen keine Lizenzgebühren an
- weder Datenbank noch Anwendung brauchen Unterhalt. Das gilt natürlich nur, solange nicht sehr viele Benutzer gleichzeitig schreibend auf die Datenbank zugreifen können müssen. In diesem Fall müsste ein Datenbank-Server benutzt werden

Für die Entwicklung:

- die verwendeten Technologien sind viel moderner und geben dem Entwickler viel mehr Möglichkeiten als Access bzw. FileMaker. Anwendungen können massgeschneidert(er) und leistungsfähig(er) gebaut werden
- ab einer gewissen Komplexität sind die verwendeten Werkzeuge viel besser geeignet, um eine Anwendung zu entwickeln. Mit der rasanten technologischen Entwicklung sinkt die minimale Komplexität, ab der sich die Verwendung moderner JavaScript-Werkzeuge lohnt momentan beinahe jährlich
- ganz einfache Anwendungen sind in FileMaker und Access schneller und einfacher gebaut
- das Know-How für die Entwicklung moderner JavaScript-Anwendungen inklusive einer relativ komplexen Entwicklungsumgebung wird vorausgesetzt. Im Gegensatz zu FileMaker und Access können (noch-)Nicht-Entwickler kaum eine electron-Anwendung aufbauen

Für den künftigen Unterhalt/Ausbau:

- im Prinzip ist nach Bereinigung der Kinderkrankheiten kaum je Unterhalt nötig :-) Im Gegensatz zu Web-Anwendungen kann darauf verzichtet werden, die verwendete Software laufend zu aktualisieren. Die Anwendung wird ja hinter der Firmen-Firewall betrieben
- aufgrund der modernen Architektur ist eine electron-Anwendung im Bedarfsfall für professionelle JavaScript-Entwickler wesentlich einfacher zu unterhalten
- electron-Anwendungen können wenn nötig zu Server-Client-Anwendungen oder gar Web-Applikationen ausgebaut werden, wobei der grösste Teil des Codes unangetastet bleibt
- die Funktionalität kann wenn gewünscht mit automatisierten Test hinterlegt werden, was die Unterhalt- und Erweiterbarkeit im Bedarfsfall stark verbessert

Ich habe früher diverse teilweise recht anspruchsvolle Access-Anwendungen gebaut, danach Web-Anwendungen und nun mit Kapla die erste electron-Anwendung. Mein persönliches **Fazit**:

- Access würde ich nur noch für sehr sehr einfache Anwendungsfälle benutzen
- Access ist am ehesten geeignet, wenn die Anwender den Umgang mit Access gewohnt sind und daher auf einen grossen Teil der Funktionalität einer eigentlichen Anwendung verzichtet werden kann (Automatisierung, Benutzerführung, intuitive, minimalistische und einfache Benutzeroberfläche). In diesem Fall stellt die Access-Anwendung im Wesentlichen nur die benötigte Datenstruktur inklusive Abfragen bereit
- wird eine einfache und übersichtliche Benutzeroberfläche benötigt, ist die Grenze schnell erreicht, ab der sich eine electron-Anwendung lohnt
- eine JavaScript-Anwendung drängt sich geradezu auf, wenn es gut möglich ist, dass sie später erweitert wird, von sehr vielen Benutzern genutzt wird oder gar über das Internet

## Entwicklungsumgebung installieren ##

	# Ordner schaffen, z.B. "kapla"
	cd kapla
    git clone https://github.com/barbalex/kapla3.git
	npm install
	npm run build-sqlite3-win64 # auf Windows
	npm run build-sqlite3-mac  # auf macOs
	npm run dev

## Release produzieren ##

	cd kapla
	npm run package-win
