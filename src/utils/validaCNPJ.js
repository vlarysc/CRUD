export function validarCNPJ(c) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  
    if ((c = c.replace(/[^\d]/g, '')).length != 14) return false
  
    if (/0{14}/.test(c)) return false
  
    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false
  
    for (var j = 0, k = 0; j <= 12; k += c[j] * b[j++]);
    if (c[13] != ((k %= 11) < 2 ? 0 : 11 - k)) return false
  
    return true
  }