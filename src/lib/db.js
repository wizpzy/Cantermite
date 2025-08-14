import prisma from "./prisma";

export async function getUserById(userId, select = null) {
    return await prisma.user.findUnique({
        where: { user_id: userId },
        select
    });
}
