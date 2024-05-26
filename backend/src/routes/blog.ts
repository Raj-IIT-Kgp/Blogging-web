import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@raj9339/common-app";
import {PrismaClient} from "@prisma/client/edge";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            });
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
});
;




blogRouter.get("/authorId", async (c) =>{
    const authorId = c.get("userId");
    return c.json({
        authorId
    })
})

blogRouter.get("/name", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log('Received request with headers:', c.req.header); // Log headers for debugging

    const authorId = c.get("userId");
    const user = await prisma.user.findUnique({
        where: {
            id: Number(authorId)
        }
    });

    if (!user) {
        c.status(404);
        return c.json({
            name: "Anonymous"
        });
    }

    return c.json({
        name: user.name
    });
});




blogRouter.post('/', async (c) => {
    const date = new Date();

    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);

    let suffix = 'th';
    if (day === '01' || day === '21' || day === '31') {
        suffix = 'st';
    } else if (day === '02' || day === '22') {
        suffix = 'nd';
    } else if (day === '03' || day === '23') {
        suffix = 'rd';
    }
    const publishedDate = `${parseInt(day)}${suffix} ${month} ${year}`;

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
            publishedDate : String(publishedDate),
            published : true

        }
    })
    return c.json({
        id: blog.id,
    })
})

blogRouter.put('/update', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400); // Changed from 411 to 400
        return c.json({
            message: "Inputs not correct"
        });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: Number(body.id)
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: body.id
    });
});


// Todo: add pagination
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs,

    })
})

blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog,

        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})

blogRouter.get("/author/:authorId", async(c) =>{
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: Number(authorId)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blogs,

        })
    }
    catch(e){
        return c.json({
            message : 'Invalid'
        })
    }
})

blogRouter.delete("/delete/:id", async(c) =>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
     await prisma.blog.delete({
            where : {
                id : Number(id)
            }
        })

        return c.json({
            message : "blog deleted succesfully"
        })
    }
    catch(e){
        return c.json({
            message : "Invalid"
        })
    }

})
