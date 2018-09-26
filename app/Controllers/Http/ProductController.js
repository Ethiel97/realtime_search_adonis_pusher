'use strict'
const Event = use('Event')

const Product = use('App/Models/Product')

class ProductController {

  async index({view}) {
    return view.render('search')
  }

  async get({response}) {
    let products = await Product.all()
    return response.json(products)
  }

  async search({params, request, response}) {

    // console.log(request.input('query'))
    let query = request.input('query')

    let products = await Product.query().where('name', 'like', '%' + query + '%')
      .orWhere('description', 'like', '%' + query + '%').fetch()

    Event.fire('search::results', products.toJSON())

    return response.json('ok')
  }

}

module.exports = ProductController
