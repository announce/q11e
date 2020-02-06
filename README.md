# IAC

[![Build Status](https://travis-ci.org/announce/icac.svg?branch=master)](https://travis-ci.org/announce/icac)

## Installation

1. Install the Chrome Extension at [**iAC - Chrome Web Store**](https://chrome.google.com/webstore/detail/icac/plbhlfecmbmkphfgcpoijlidjapddidj?utm_source=github).

## Prerequisite

* Docker
  * Verified with: Version 18.06.0-ce-mac70
* Node v8.x
* Yarn v1.x

## Development

Run the command below:

```bash
./icac start
```

For the release:

```bash
./icac release
```

Then you will get the crx zipfile in `./var`.

## Project Links

* Upstream work: [trunk](https://github.com/announce/icac/compare/master...ymkjp:master)
* Demo app: [crx](https://chrome.google.com/webstore/detail/icac/plbhlfecmbmkphfgcpoijlidjapddidj?utm_source=github)
* Release: [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)

## Documents

* CRX
  * [Declare Permissions](https://developer.chrome.com/extensions/declare_permissions)
  * [chrome\.i18n](https://developer.chrome.com/extensions/i18n)
* ImageMagick
  * [Text Handling \- IM v6](http://www.imagemagick.org/Usage/text/#label_bestfit)
