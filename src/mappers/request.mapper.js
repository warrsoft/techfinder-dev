export const mapperRequestToDb = (request) => {
    const mapperedRequest = {
        id: request.id,
        subject: request.subject,
        description: request.description,
        tech_id: request.techId,
        user_id: request.userId,
        status: request.statusId,
        created_at: request.createdAt,
        lats_modified: request.lastModified,
    }

    Object.keys(mapperedRequest).forEach((key) => {
        if (mapperedRequest[key] === null || mapperedRequest[key] === undefined) {
            delete mapperedRequest[key]
        }
    })

    return mapperedRequest
}

export const mapperRequestFromDb = (request) => {

    const mapperedRequest = {
        id: request.id,
        subject: request.subject,
        description: request.description,
        techId: request.tech_id,
        userId: request.user_id,
        status: request.status,
        createdAt: request.created_at,
        lastModified: request.last_modified,
    }

    Object.keys(mapperedRequest).forEach((key) => {
        if (mapperedRequest[key] === null || mapperedRequest[key] === undefined) {
            delete mapperedRequest[key]
        }
    })

    return mapperedRequest
}