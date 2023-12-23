/**
 * Calculate features for the given token data.
 * @param {Object} tokenData
 * @param {string} tokenData.tokenId - Unique identifier of the token on its contract.
 * @param {string} tokenData.hash - Unique hash generated upon minting the token.
 */
function calculateFeatures(tokenData) {
  /**
   * Implement me. This function should return a set of features in the format of key-value pair notation.
   *
   * For example, this should return `{"Palette": "Rosy", "Scale": "Big", "Tilt": 72}` if the desired features for a mint were:
   * - Palette: Rosy
   * - Scale: Big
   * - Tilt: 72
   */
  
  
  class Random {
   constructor() { 
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

  
  let R = new Random()
  

// features are as follows:
// palette
// form
// highlights
// ink saturation
// border
// line thickness

//choose stroke
  
let alStroke = R.random_dec()

var strokeNum = 0
  
if (alStroke < 0.2){
  strokeNum = 0
  //faint
} else if (alStroke >= 0.2 && alStroke < 0.4){
  strokeNum = 1
  //soft
  } else if (alStroke >= 0.4 && alStroke < 0.6){
  strokeNum = 2
  //present
} else if (alStroke >= 0.6 && alStroke < 0.8){
  strokeNum = 3
  //insistent
}  else if (alStroke >= 0.8 && alStroke <= 1){
  strokeNum = 4
} //established

//choose fill

let alFill = R.random_dec()

var fillNum = 0
  
if (alFill < 0.2){
  fillNum = 0
  //faded
} else if (alFill >= 0.2 && alFill < 0.4){
  fillNum = 1
  //known
  } else if (alFill >= 0.4 && alFill < 0.6){
  fillNum = 2
  //borderless
} else if (alFill >= 0.6 && alFill < 0.8){
  fillNum = 3
  //decided
}  else if (alFill >= 0.8 && alFill <= 1){
  fillNum = 4
} //fully saturated
  
  
  
 


//choose palette
  
  let ps = R.random_choice([0, 0,
                            3, 3, 3, 3,
                            6, 
                            9, 9,
                            12, 12,
                            15, 15, 15,  
                            18, 18, 18,
                            21, 
                            24, 
                            27, 27, 27,
                            30, 30,
                            33, 
                            36, 36,
                            39, 39,
                            42, 42, 42,
                            45, 
                            48, 48,
                            51, 
                            54])

  
 
let forms = {
  1: "Cascadia",
  2: "Deco",
  3: "MCM",
  4: "Hyperion",
  5: "Deco",
  6: "Megalith",
  7: "Estuary",
  8: "Mit und Gegen",
  9: "Perestroika",
  10: "Galactica",
  11: "Miró",
  12: "Aion",
  13: "Theia",
  14: "Hyperion",
  15: "Galactica",
  16: "Prometheus",
  17: "Affiche",
  18: "Komorebi",
  19: "Lotus-Eater",
  20: "Let in the Light",
  21: "Decisive Leadership",
  22: "Republica",
  23: "Lucid Dream",
  24: "All Things Must Pass",
  25: "Let in the Light",
  26: "Sentinel"
}

let palettes = {  
  0: "Salt & Sun",
  3: "Space Race",
  6: "Century",
  9: "Poolside Encounter",
  12: "Montreal '76'",
  15: "May 1",
  18: "Our Immaculate Leadership",
  21: "Aiko's Affair",
  24: "All Your Base",
  27: "Gundam",
  30: "Midnight",
  33: "South Beach Speedo",
  36: "LA Powder Room",
  39: "Serious Moonlight",
  42: "Jazzercise®",
  45: "Backpacking",
  48: "Noraebang",
  51: "Olympiad",
  54: "Chalcedony"
}

let borders = {
  0:"Bone",
  1:"Charcoal",
  2:"Absent",
  3:"Background",
  4:"Saturated"  
}

let highlights = {
  0: "Absent",
  1: "Suggested",
  2: "Present",
  3: "Assertive",
  4: "Brilliant",
}

let inkCoverage = {
  0: "Faint",
  1: "Faded",
  2: "Present",
  3: "Established",
  4: "Heavy",
}


let lineThickness = {
  0.33: "Thin",
  0.44: "Thin",
  0.66: "Medium",
  0.77: "Medium",
  0.99: "Thick",
  1.11: "Thick"
}

//choose form
    let formChoice = R.random_choice([
   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
   2, 2, 2, 2, 2, 
   3, 3, 3, 3, 3, 
   4, 4, 4, 4, 4, 4,
   5, 5, 5, 5, 
   6, 6, 6, 6,  
   7, 7, 7, 7, 7, 7, 7, 7, 
   8, 8, 8, 8, 
   9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 
   10, 10, 10,
   11, 11, 11, 11, 11, 11, 
   12, 12, 12, 12, 12, 12, 
   13, 13, 13, 13, 13, 13, 
   14, 14, 14, 14, 14, 14, 
   15, 15, 
   16, 16, 16, 16, 
   17, 17, 17, 17, 17, 17, 
   18, 18, 18, 18, 18, 18, 18,
   19, 19, 19, 19, 19, 19, 
   20, 20, 20, 20, 20, 20, 
   21, 21, 21, 21, 21, 21,
   22, 22, 22,
   23, 23, 23, 23,
   24, 24, 24, 24, 24, 24, 24,
   25, 25, 25, 25,
   26, 26, 26
   ])
  

//choose line thickness
var lt = R.random_choice([0.33, 0.44, 0.66, 0.77, 0.99, 1.11])



//choose border
var borderSwitcher = R.random_dec();
var borderNum = 0
  
if (borderSwitcher >= 0.3 && borderSwitcher < 0.6){
  borderNum = 0
  //Bone
} else if (borderSwitcher < 0.3){
  borderNum = 1
  //Charcoal
  } else if (borderSwitcher >= 0.6 && borderSwitcher < 0.7){
  borderNum = 2
  //borderless
} else if (borderSwitcher >= 0.7 && borderSwitcher < 0.9){
  borderNum = 3
  //background
}  else if (borderSwitcher >= 0.9 && borderSwitcher <= 1){
  borderNum = 4
}


  
  printProperties(forms[formChoice], palettes[ps], borders[borderNum], inkCoverage[fillNum], highlights[strokeNum], lineThickness[lt])
 


function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}



function printProperties(formName, paletteName, borderStyle, inkCoverage, highlights, lineThickness){
  print(formName)
  print(paletteName)
  print(borderStyle)
  print(inkCoverage)
  print(highlights)
  print(lineThickness)
 
}
  
  return {}
}