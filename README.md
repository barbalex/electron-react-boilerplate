# Kapla #

## Projektbeschreibung ##

Mit Kapla verwaltet die Abteilung Recht des AWEL (Amt für Abfall, Wasser, Energie und Luft) des Kantons Zürich ihre Geschäfte.

Kapla ist in JavaScript programmiert und benutzt unter anderem:

- [sqlite](http://sqlite.org)
- [electron](http://electron.atom.io)
- [nodejs](https://nodejs.org)
- [React](https://facebook.github.io/react)
- [Redux](http://redux.js.org)
- [styled components](https://github.com/styled-components/styled-components)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

Für viel mehr Info siehe [Projektbeschreibung.pdf](https://github.com/barbalex/kapla3/raw/master/app/etc/Projektbeschreibung.pdf "Projektbeschreibung")

## Entwicklungsumgebung installieren ##
	
	// Ordner schaffen, z.B. "kapla"
	cd kapla
    git clone https://github.com/barbalex/kapla3.git
	npm install
	npm run build-sqlite3-win64 // on windows
	npm run build-sqlite3-mac  // on macOs
	npm run dev

## Release produzieren ##

	cd kapla
	npm run package-win