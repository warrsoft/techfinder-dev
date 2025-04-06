export const mapperUserToDb = (user) => {
    return {
        name: user.name,
        last_name: user.lastName,
        username: user.userName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar_url: user.avatarUrl,
    }
}

export const mapperUserFromDb = (user) => {
    return {
        name: user.name,
        lastName: user.last_name,
        userName: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatar_url,
    }
}