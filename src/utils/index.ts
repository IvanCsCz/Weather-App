export const formatTempeture = (tempeture: number) : number => {
  const kelvin = 273.15
  return parseInt((tempeture - kelvin).toString())
}