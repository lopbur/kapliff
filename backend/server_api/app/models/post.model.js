module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    author: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    view: {
      type: Sequelize.INTEGER
    }
  });

  return Post;
}