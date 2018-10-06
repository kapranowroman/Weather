export const windDegConvert = (deg) => {

    if (355 <= deg || deg <= 5) {
        return 'Северный'
    }
    if (deg > 5 && deg < 85) {
        return 'Северо-восточный'
    }
    if (deg >= 85 && deg <= 95) {
        return 'Восточный'
    }
    if (deg > 95 && deg < 175) {
        return 'Юго-восточный'
    }
    if (deg >= 185 && deg <= 195) {
        return 'Южный'
    }
    if (deg > 195 && deg < 265) {
        return 'Юго-западный'
    }
    if (deg >= 265 && deg <= 275) {
        return 'Западный'
    }
    if (deg > 275 && deg < 355) {
        return 'Северо-западный'
    }
}
export const convertPressure = (pres) => {
    return pres ? Math.round(pres / 1.333) : ''
}
