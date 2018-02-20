# freeCodeCamp Timestamp Microservice Project #

## description ##
User can submit either a UNIX timestamp or a natural human-readable time as a url path, and the server will respond with both the UNIX time and human-readable time in JSON. Based on the project found here: https://www.freecodecamp.org/challenges/timestamp-microservice

## endpoints ##

### /unix_timestamp or /date_string ###
either of these endpoints will return the same information, a JSON representation of the time requested as both a human-readable date string and as a UNIX timestamp. The date_string endpoint is flexible with formatting and will accept a variety of formatting styles as demonstrated below:

**American Style Dates**
* december 12, 2017
* December 14th, 2018
* dec 18 2016

**British Style Dates**
* 12 december 2017
* 1st of December, 2018
* 16 dec, 2016  

**General formatting guidelines for dates**
* Month name can be long or short, uppercase/lowercase/capitalized doesn't matter `'dec', 'December', 'DEC'`
* day can numeric, 2-digit, and may be followed by ordinals: `01,  12, 1st, 3rd, 24th`
* year must be 4 digit, and may be preceded by a comma, but is not necessary: `', 2017'` or `' 2017'`
* if using british style, "of" may be placed between day and month.

## dependencies ##
are listed in package.json . Only requires node & express to run.
