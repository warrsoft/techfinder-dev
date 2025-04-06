export const mapperTechToDb = (tech) => {
    const mapperedTech = {
        id: tech.id,
        business_name: tech.businessName,
        business_phone: tech.businessPhone,
        professions: tech.professions,
        services: tech.services,
        province: tech.province,
        sector: tech.sector,
        geo_location: tech.location,
        status: tech.status,
        rating: tech.rating,
    }

    Object.keys(mapperedTech).forEach((key) => {
        if (mapperedTech[key] === null || mapperedTech[key] === undefined) {
            delete mapperedTech[key]
        }
    })

    return mapperedTech
}

export const mapperTechFromDb = (tech) => {
    const mapperedTech = {
        id: tech.id,
        businessName: tech.business_name,
        businessPhone: tech.business_phone,
        professions: tech.professions,
        services: tech.services,
        province: tech.province,
        sector: tech.sector,
        location: tech.geo_location,
        status: tech.status,
        rating: tech.rating,
    }

    Object.keys(mapperedTech).forEach((key) => {
        if (mapperedTech[key] === null || mapperedTech[key] === undefined) {
            delete mapperedTech[key]
        }
    })

    return mapperedTech
}