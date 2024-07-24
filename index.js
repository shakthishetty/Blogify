import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/home', (req, res) => {
  res.render('home', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  posts.push({ id, title, content });
  res.redirect('/home');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  post.title = title;
  post.content = content;
  res.redirect('/home');
});

app.post('/posts/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/home');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
