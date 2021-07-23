import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    return await Post.query().select('id', 'name').orderBy('created_at', 'desc')
  }

  public async store({ request }: HttpContextContract) {
    const newSchema = schema.create({
      name: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newSchema })

    const pet = await Post.create(payload) // create and insert to databse
    return pet
  }

  public async show({ params }: HttpContextContract) {
    return Post.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const data = request.body()
    const pet = await Post.findOrFail(params.id)
    pet.name = data.name

    return pet.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const pet = await Post.findOrFail(params.id)
    return pet.delete()
  }
}
