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

Kapla ist in JavaScript geschrieben und benutzt unter anderem:

- [sqlite](http://sqlite.org)
- [electron](http://electron.atom.io)
- [nodejs](https://nodejs.org)
- [React](https://facebook.github.io/react)
- [MobX](https://github.com/mobxjs/mobx)
- [styled components](https://github.com/styled-components/styled-components)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

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
