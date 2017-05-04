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

- [sqlite](http://sqlite.org)
- [electron](http://electron.atom.io)
- [nodejs](https://nodejs.org)
- [React](https://facebook.github.io/react)
- [MobX](https://github.com/mobxjs/mobx)
- [styled components](https://github.com/styled-components/styled-components)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

Ich will diese Kombination nachfolgend der Einfachheit halber "electron-Anwendung" nennen.

Gegenüber FileMaker bzw. Access-Anwendungen bietet diese Lösung folgende Vorteile:

- die exe-Datei in Kombination mit der sqlite-Datei bringen alles mit, was es für den Betrieb von Kapla braucht: Im Betrieb gibt es keine Software-Abhängigkeiten!
- die exe-Datei und die sqlite-Datei funktionieren auf allen aktuellen 64bit-Versionen von Windows. Daher kann man davon ausgehen, dass sie noch längere Zeit unverändert weiter benutzt werden können
- die verwendeten Technologien sind viel moderner und geben dem Entwickler viel mehr Möglichkeiten als Access bzw. FileMaker. Anwendungen können massgescheidet(er), benutzerfreundlich(er) und leistungsfähig(er) gebaut werden
- electron-Anwendungen können so gebaut werden, dass Updates automatisch erfolgen (bei Kapla ist das nicht vorgesehen)
- electron-Anwendungen können wenn nötig zu Server-Client-Anwendungen oder gar Web-Applikationen ausgebaut werden, wobei der grösste Teil des Codes unangetastet bleibt
- aufgrund der modernen Architektur ist Kapla im Bedarfsfall für professionelle JavaScript-Entwickler wesentlich einfacher zu unterhalten
- die Funktionalität kann wenn gewünscht mit automatisierten Test hinterlegt werden, was die Unterhalt- und Erweiterbarkeit im Bedarfsfall stark verbessert
- ab einer gewissen Komplexität sind die verwendeten Werkzeuge viel besser geeignet, um eine Anwendung zu entwickeln. Mit der rasanten technologischen Entwicklung sinkt die minimale Komplexität, ab der sich die Verwendung moderner JavaScript-Werkzeuge lohnt momentan beinahe jährlich

...und Nachteile:

- das Know-How für die Entwicklung moderner JavaScript-Anwendungen inklusive einer relativ komplexen Entwicklungsumgebung wird vorausgesetzt. Im Gegensatz zu FileMaker und Access ist das keine Möglichkeit für (noch-)Nicht-Entwickler, eine Anwendung aufzubauen
- ganz einfache Anwendungen sind in FileMaker und Access schneller und einfacher gebaut

Mein persönliches Fazit, nachdem ich früher diverse teilweise recht anspruchsvolle Access-Anwendungen gebaut habe, danach Web-Anwendungen und nun mit Kapla die erste electron-Anwendung: Access würde ich nur noch für sehr sehr einfache Anwendungsfälle benutzen. Und vor allem dann, wenn die Anwender den Umgang mit Access gewohnt sind und daher auf einen grossen Teil der Funktionalität einer eigentlichen Anwendung verzichtet werden kann. Wenn eine einfache und übersichtliche Benutzeroberfläche benötigt werden, ist die Grenze schnell erreicht, ab der sich eine electron-Anwendung lohnt. Und wenn es wahrscheinlich ist, dass die Anwendung später erweitert wird, von sehr vielen Benutzern genutzt wird oder gar über das Internet, dann ist der Fall klar.

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
