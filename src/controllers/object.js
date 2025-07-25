const Object = require('../model/object/object');
const Picture = require('../model/object/picture');
const User = require('../model/user');

const createObject = async (req, res) => {
  const { name, description, category, location_of_loss, date_of_loss } = req.body;
    
  const createBy = req.session.userId;

  const objectPictures = req.files.map((file) => ({ img: file.filename }));

  const objectData = {
    name,
    description,
    category,
    location_of_loss,
    date_of_loss,
    createBy,
  };

  try {
    const object = await Object.create(objectData);

    if (!object) throw new Error();

    const pictures = await Promise.all(
      objectPictures.map((picture) =>
        Picture.create({
          img: picture.img,
          objectId: object.id,
        })
      )
    );

    console.log('aqui', object.id);

    const object_res = await Object.findByPk(object.id, {
      attributes: [
        'id',
        'name',
        'description',
        'location_of_loss',
        'date_of_loss',
        'category',
      ],

      include: [
        {
          model: Picture,
          attributes: ['id', 'img'],
        },
      ],
    });

    if (!object_res) throw new Error();

    return res.redirect('/dashboard');

  } catch (error) {
    return res.status(400).json({
      error: '@objects/create',
      message: error.message || 'object creation failed',
    });
  }
};

const getObjects = async (req, res) => {
  try {
    
    const objects = await Object.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'location_of_loss',
        'date_of_loss',
        'category',
      ],
      include: [
        {
          model: Picture,
          attributes: ['id', 'img'],
        },

        {
          model: User,
          attributes: ['firstName', 'lastName', 'email', 'contactNumber'],
        },

      ],
    });

    // return res.status(200).json({ objects });
    return res.render('index', { objetos: objects });

  } catch (error) {
    res.status(400).send('Erro ao carregar a página: ' + (error.message || 'Falha ao buscar objetos.'));
  }
};

const updateObject = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, location_of_loss, date_of_loss } = req.body;

  const createBy = req.session.userId;

  try {
    // Verifica se o objeto existe e pertence ao usuário
    const object = await Object.findOne({ where: { id, createBy } });

    if (!object) throw new Error('Objeto não encontrado!');

    // Atualiza os dados
    await object.update({
      name,
      description,
      category,
      location_of_loss,
      date_of_loss,
    });

    // Atualiza imagens se foram enviadas
    if (req.files && req.files.length > 0) {
      const objectPictures = req.files.map((file) => ({ img: file.filename }));

      // Remove as imagens antigas
      await Picture.destroy({ where: { objectId: object.id } });

      // Adiciona as novas imagens
      await Promise.all(
        objectPictures.map((picture) =>
          Picture.create({
            img: picture.img,
            objectId: object.id,
          })
        )
      );
    }

    // Busca o objeto atualizado com as imagens
    const updatedObject = await Object.findByPk(object.id, {
      attributes: [
        'id',
        'name',
        'description',
        'location_of_loss',
        'date_of_loss',
        'category',
      ],
      include: [{ model: Picture, attributes: ['id', 'img'] }],
    });

    //return res.status(200).json({ object: updatedObject });
    return res.redirect('/dashboard');

  } catch (error) {
    return res.status(400).json({
      error: '@objects/update',
      message: error.message || 'Falha ao atualizar objeto',
    });
  }
};

const deleteObject = async (req, res) => {
  const { id } = req.params;
  const createBy = req.session.userId;

  try {
    const object = await Object.findOne({ where: { id, createBy } });

    if (!object) throw new Error('Objeto não encontrado!');

    // Deleta as imagens associadas primeiro
    await Picture.destroy({ where: { objectId: object.id } });

    // Deleta o objeto em si
    await object.destroy();

    return res.redirect('/dashboard');

  } catch (error) {
    return res.status(400).json({
      error: '@objects/delete',
      message: error.message || 'Falha ao deletar objeto',
    });
  }
};

const getUserObjects = async (req, res) => {

  if (!req.session.userId) {
    return res.redirect('/login');
  }

  const createBy = req.session.userId;

  try {
    const objects = await Object.findAll({
      where: { createBy },
      attributes: [
        'id',
        'name',
        'description',
        'location_of_loss',
        'date_of_loss',
        'category',
      ],
      include: [
        {
          model: Picture,
          attributes: ['id', 'img'],
        },
      ],
    });

    // return res.status(200).json({ objects });
    return res.render('dashboard', { objetos: objects });

  } catch (error) {
    return res.status(400).json({
      error: '@objects/getUserObjects',
      message: error.message || 'Falha ao buscar objetos do usuário',
    });
  }
};

module.exports = {
  createObject,
  getObjects,
  updateObject,
  deleteObject,
  getUserObjects,
};
