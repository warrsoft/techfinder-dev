export const mapperUserToDb = (user) => {
    const mapperedUser = {
        id: user.id,
        name: user.name,
        last_name: user.lastName,
        username: user.userName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar_url: user.avatarUrl,
    }

    Object.keys(mapperedUser).forEach((key) => {
        if (mapperedUser[key] === undefined) {
            delete mapperedUser[key]
        }
    })

    return mapperedUser
}

export const mapperUserFromDb = (user) => {
    const mapperedUser = {
        id: user.id,
        name: user.name,
        lastName: user.last_name,
        userName: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatar_url,
    }

    Object.keys(mapperedUser).forEach((key) => {
        if (mapperedUser[key] === undefined) {
            delete mapperedUser[key]
        }
    })

    return mapperedUser
}