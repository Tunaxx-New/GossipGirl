const express    = require('express')
const bodyParser = require('body-parser')
const cookie     = require('cookie-parser')
const session    = require('express-session')
const path       = require('path')
const ejs        = require('ejs')
const mongo      = require('./mongo.js')
const email      = require('./email.js')
const fs         = require('./fs.js')
const multer     = require('./fileSave')
const utils      = require('./utils.js')
const {getUser}  = require("./mongo");
const chat       = require("./chat.js")
const http = require('http');
const https = require('https');
const {getChat} = require("./chat");

const PORT       = process.env.PORT || 3000
const app        = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
app.set('view engine', 'ejs')

var news = `{"status":"success","totalResults":98791,"results":[{"title":"Citröen Ami eleito como 'Produto do Ano' pela Exame Informática","link":"https://www.noticiasaominuto.com/auto/2005398/citroen-ami-eleito-como-produto-do-ano-pela-exame-informatica?utm_source=rss-auto&amp;utm_medium=rss&amp;utm_campaign=rssfeed","keywords":["Auto"],"creator":["Notícias ao Minuto"],"video_url":null,"description":"Na categoria de 'Mobilidade Inteligente'.","content":"O Citroën AMI foi escolhido como 'Produto do Ano' na categoria de 'Mobilidade Inteligente'. O prémio atribuído pela revista Exame Informática e entregue na passada quinta-feira à tarde em Oeiras. \\"O Citroën AMI não é o carro para a família nem para fazer ‘road trips’, mas representa o que deve ser o futuro da mobilidade urbana: compacto, acessível, pegada ambiental baixíssima, fácil de usar e com um baixo custo de utilização. Uma eficiência evidente logo no design do AMI, que foi otimizado para reduzir o número de peças e os custos de produção e manutenção. Em suma, in” , destacou Sérgio Magno, diretor da Exame Informática. Com autonomia para 75 km, a bateria de iões de lítio de 5,5 kWh que alimenta o motor elétrico de 6 kW (8cv) recarrega-se facilmente, em apenas 3 horas e a partir de uma tomada standard. Leia Também: Não estranhe se vir um Citröen Ami a distribuir correspondência","pubDate":"2022-05-29 08:54:49","image_url":"https://media-manager.noticiasaominuto.com/naom_61129eb04339d.jpg?w=1920","source_id":"noticiasaominuto","country":["portugal"],"category":["top"],"language":"portuguese"},{"title":"Rússia prolonga fecho de aeroportos próximos da fronteira ucraniana","link":"https://www.noticiasaominuto.com/mundo/2006341/russia-prolonga-fecho-de-aeroportos-proximos-da-fronteira-ucraniana?utm_source=rss-mundo&amp;utm_medium=rss&amp;utm_campaign=rssfeed","keywords":["Mundo"],"creator":["Lusa"],"video_url":null,"description": "A Rússia vai manter 11 aeroportos das suas regiões próximas da Ucrânia encerrados até 06 de junho, a...","content":"O espaço aéreo no centro e sul da Rússia foi temporariamente encerrado à aviação comercial em 24 de fevereiro, quando as forças russas invadiram a Ucrânia. A medida foi decretada por um período inicial de uma semana, mas tem sido sucessivamente prorrogada. \\"O regime de restrições temporárias de voos em 11 aeroportos russos foi prorrogado até 06 de junho de 2022\\", disse a Rosaviatsia, num comunicado citado pela agência oficial TASS. A medida, que estava atualmente em vigor até 31 de maio, afeta os aeroportos das cidades de Anapa,Belgorod, Bryansk, Voronezh, Gelendzhik, Krasnodar, Kursk, Lipetsk, Rostov-on-Don, Simferopol e Elista. O regulador recomendou que as companhias aéreas russas organizem o transporte de passageiros em rotas alternativas ut ilizando os aeroportos de Sochi, Volgograd, Mineralnye Vody, Stavropol e Moscovo. De acordo com a Rosaviatsia, todos os outros terminais aeroportuários do país estão a operar normalmente. A guerra na Ucrânia, que a Rússia designa como uma \\"operação militar especial\\", entrou hoje no 95.º dia. Dsconhece-se o número de vítimas de mais de três meses de combates, mas diversas fontes, incluindo a ONU, admitem ser elevado. A ONU confirmou a morte de mais de 4.000 civis, mas tem alertado que o número real será consideravelmente superior. A invasão russa foi condenada pela generalidade da comunidade internacional. A União Europeia e países como os Estados Unidos, o Reino Unido ou o Japão têm decretado sucessivos pacotes de sanções contra interesses russos e fornecido armas à Ucrânia. Leia Também: Zelensky defende que Rússia deve ser declarada \\"Estado terrorista\\"","pubDate":"2022-05-29 08:54:49","image_url":"https://media-manager.noticiasaominuto.com/37404748.jpg?w=1920","source_id":"noticiasaominuto","country":["portugal"],"category":["top"],"language":"portugu ese"},{"title":"Bolsonaro pode estar a tentar replicar invasão do Capitólio no Brasil","link":"https://www.noticiasaominuto.com/mundo/2006339/bolsonaro-pode-estar-a-tentar-replicar-invasao-do-capitolio-no-brasil?u tm_source=rss-mundo&amp;utm_mediu=rss&amp;utm_campaign=rssfeed","keywords":["Mundo"],"creator":["Lusa"],"video_url":null,"description":"O constitucionalista Diego Werneck Arguelhes, signatário da carta envi ada à ONU sobre a \\"campanha se...","content":"\\"Jair Bolsonaro está fazendo isso em câmara lenta, o que a gente está a ver no Brasil é um 06 de janeiro, a invasão do capitólio em câmara lenta\\", contou à Lusa o professor associado do Instituto de Ensino e Pesquisa do Brasil e doutorado em Direito pela Yale University, nos Estados Unidos. O ataque à sede do poder legislativo norte-americano ocorrido em 06 de janeiro de 2021 por uma multidão de apoiantes do ex-presidente Donald Trump que pretendiam impedir a confirmação da eleição de Joe Biden, na sequência de Donald Trump ter levantado suspeitas infundadas de que processo eleitoral tinha sido fraudulento. Este 'ataque à democracia norte-americana' ficou marcado pela morte de cinco pessoas e de mais de uma centena de polícias agredidos. \\"Olhamos para o que aconteceu nos Estados Unidos com a invasão do Capitóli o e percebemos que estava muito claro, basta juntar os factos, que o Bolsonaro está tomando o que aconteceu lá nos Estados Unidos como um 'blueprint', um plano que ele pode seguir\\", denunciou o constitucionalista brasi leiro. Foi precisamente o receio de que aconteça o mesmo no Brasil, que em outubro terá eleições presidenciais, altamente polarizadas entre o atual Presidente brasileiro, Jair Bolsonaro, e o ex-presidente Lula da Silva, q ue levou Diego Werneck Arguelhes e mais de 80 professores e juristas brasileiros a enviarem a carta ao relator especial para a Independência de Juízes e Advogados da ONU, Diego Garcia. \\"Somos um grupo de académicos, de direito, nós não somos ativistas, nem políticos\\", frisou. Para o constitucionalista, o risco de acontecer algo mais grave após as eleições presidenciais no Brasil é maior do que o que aconteceu nos Estado Unidos já qu e, Bolsonaro, começou a plantar o discurso \\"de fraude nas eleições há muito tempo\\", desde as eleições que ele próprio venceu, em 2018. \\"Ele já disse várias vezes que o resultado que não reflita a vitória dele vai ser suspeito\\", lembrou Diego Werneck Arguelhes. \\"Já faz parte da base de apoio dele essa desconfiança em relação às urnas, mesmo que isso não faça sentido alguma e que não existam evidências\\", considerou. Para a lém disso, denunciou, as ações de Bolsonaro para minar o processo eleitoral têm \\"conivência de várias instituições\\" como a Câmara dos Deputados, que nunca iniciou um processo de impeachment (como aconteceu nos Estados Unidos com Trump) e até por parte da Procuradoria-geral da República por não investigar atos de Bolsonaro passiveis de crime. \\"Trump chegou a sofrer um processo de impeachment (...) no Brasil o Bolsonaro não teve ne nhum início de processo contra ele, a mensagem que ele recebeu da Procuradoria-Geral da República é de que ele pode minar a justiça eleitoral, semear a desconfiança nas eleições sem que isso gere um problema para ele\\",acusou. Em paralelo, para além de insistir que o sistema de votação eletrónica do país não é confiável, Bolsonaro tem intensificado os ataques a magistrados do Supremo Tribunal Federal (STF) e tem dito que não respeitará determinadas decisões judiciais, em especial do juiz Alexandre de Morais, que será o presidente do Tribunal Superior Eleitoral durante as eleições presidenciais do Brasil. Em abril, Bolsonaro reverteu a condenação, atrav és de um indulto presidencial, do congressista de extrema-direita Daniel Silveira, condenado a oito anos de prisão pelo Supremo Tribunal Federal (STF) pelas suas ameaças às instituições democráticas. A acrescentar, tem ac usado repetidamente membros da autoridade eleitoral de favorecer o seu principal rival, Luiz Inácio Lula. \\"Nos últimos meses ficou claro que o Governo tem um plano em andamento, que é minar a confiança nas eleições e no judiciário\\" e de \\"intimidar os juízes\\", afirmou Diego Werneck Arguelhes. De acordo com o Constitucionalista, Bolsonaro é um \\"Presidente que quer remover limites ao seu poder\\" e é um homem \\"hostil à ide ia de que o poder dele é limitado por qualquer outra instituição\\". Nas últimas semanas os ataques do Presidente brasileiro à segurança do processo eleitoral têm aumento, tendo Bolsonaro pedido, repetidamente, a partici pação de militares no apuramento dos votos nas eleições que decorrerão em outubro. \\"Infelizmente o setor das forças armadas que está no Governo tem endossado, isso não existe nos Estados Unidos\\", disse Diego Werneck Arguelhes. Voltando às comparações com o que aconteceu no dia 06 de janeiro de 2021 nos Estados Unidos, o constitucionalista brasileiro considerou ter sido \\"um estrago sem precedentes da democracia americana, mas não  foi tão grave como poderia ser\\". No Brasil, insistiu, \\"esse estrago poderá ser muito maior\\". \\"Esse estrago, o Bolsonaro já conseguiu fazer, conseguiu meter em dúvida a questão: Será que as forças armadas e o P residente aceitariam um resultado desfavorável?\\", concluiu. De acordo com as últimas sondagens, Lula da Silva aumentou a diferença para Jair Bolsonaro. O candidato do PT tem 48% das intenções de voto e Bolsonaro, candi dato do Partido Liberal (PL), te 27%. Parvencer à primeira volta é necessário mais de 50% dos votos. Leia Também: Bolsonaro apela aos 'valores cristãos' para conquistar o voto evangélico","pubDate":"2022-05-29 08:54 :49","image_url":"https://media-manager.noticiasaominuto.com/38460247.jpg?w=1920","source_id":"noticiasaominuto","country":["portugal"],"category":["top"],"language":"portuguese"}]}`
app.get('/updateNews', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title == null && user.isAdmin) {
        const resNews = res.get('https://newsdata.io/api/1/news?apikey=pub_7796ab6f32bff3a02b05b1672bbceedaedd7')
        var str = ""
        https.get('https://newsdata.io/api/1/news?apikey=pub_7796ab6f32bff3a02b05b1672bbceedaedd7',
            (response) => {
                response.on('data', function (chunk) {
                    str += chunk
                });
                response.on('end', async function () {
                    news = JSON.parse(str)
                    res.redirect('back')
                });
            }
        );
    } else {
        res.redirect('back')
    }
})

//
// GET  -> Main page
// SEND -> render 'html/index.ejs'
app.get("/", async (req, res) =>
{
    const topics = await mongo.getTopics()
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    let tst
    if (req.query.toast)
        tst = JSON.parse(req.query.toast)
    if (news !== undefined)
        for (let i = 0; i < news.length; i++)
            news[i].slice(0, 256)
    if (user.title === undefined)
        await mongo.changeUser(req.cookies.login, 'online', true)
    user.online = true
    res.render(path.join(__dirname, 'html', 'view', 'index'),
        {
            topics: topics,
            user: user,
            toast: tst,
            news: JSON.parse(news).results
            //news: news.results
        })
})



//
// Page to create post
//
app.get('/createPost', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    const topics = await mongo.getTopics()
    let newsLink = req.query.newsLink

    if(newsLink === undefined) {
        newsLink = ""
    }

    if (user.title == null) {
        res.render(path.join(__dirname, 'html', 'view', 'createPost'),
            {
                user: user,
                topics: topics,
                newsLink: newsLink
            })
    } else {
        user.title = "Unsigned user"
        user.message = "Please login to the site!"
        res.render(path.join(__dirname, 'html', 'view', 'error'),
            {
                error: user,
                link: "/login"
            })
    }
})


//
// GET  -> *.html
// SEND -> render *.html || ejs
app.get("/login", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','login.html'))
})
app.get("/register", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','register.html'))
})



//
// GET  -> Answers iframe
// SEND -> render 'html/view/index.ejs'
app.get("/getAnswers", async (req, res) =>
{
  const postId = req.query.postId
  let answers = await mongo.getAnswers(postId, req.query.parent)
  let isAdmin = false
  let show = false
  if (req.query.show)
      show = req.query.show
  const user = await mongo.getUser(req.cookies.login, req.cookies.password)
  if (user.title == null && user.isAdmin)
      isAdmin = true
  if (answers.length <= 0)
      res.send('no')
  else {
      if (answers.length > 0)
          switch (req.query.sort) {
              //Up rating
              case '0':
                  answers = answers.sort((a, b) => ((a.likes.length - a.dislikes.length) < (b.likes.length - b.dislikes.length)) ? 1 : -1)
                  break

              //Down rating
              case '1':
                  answers = answers.sort((a, b) => ((a.likes.length - a.dislikes.length) > (b.likes.length - b.dislikes.length)) ? 1 : -1)
                  break

              //Old posts
              case '2':
                  answers = answers.sort((a, b) => (a.realTime.localeCompare(b.realTime) <= 0) ? 1 : -1)
                  break

              // New posts
              case '3':
                  answers = answers.sort((a, b) => (a.realTime.localeCompare(b.realTime) > 0) ? 1 : -1)
                  break
          }
      res.render(path.join(__dirname, 'html', 'view', 'fragments', 'answer'),
          {
              answers: answers,
              isAdmin: isAdmin,
              level: parseInt(req.query.level) + 1,
              show: show,
              url: req.originalUrl,
              sort: req.query.sort
          })
  }
})

//
// GET  -> Post iframe
// SEND -> render 'html/view/index.ejs'
app.get("/getPost", async (req, res) =>
{
    const index = req.query.index
    const topic = req.query.topic
    let type = req.query.sort
    if (type === undefined)
        type = '0'
    if (topic === 'undf') {
        let post = await mongo.getPostsBy('_id', index)
        if (post.length > 0)
            switch (type) {
                //Up rating
                case '0':
                    post = post.sort((a, b) => ((a.likes.length - a.dislikes.length) < (b.likes.length - b.dislikes.length)) ? 1 : -1)
                    break

                //Down rating
                case '1':
                    post = post.sort((a, b) => ((a.likes.length - a.dislikes.length) > (b.likes.length - b.dislikes.length)) ? 1 : -1)
                    break

                //Old posts
                case '2':
                    post = post.sort((a, b) => (a.realTime.localeCompare(b.realTime) <= 0) ? 1 : -1)
                    break

                // New posts
                case '3':
                    post = post.sort((a, b) => (a.realTime.localeCompare(b.realTime) > 0) ? 1 : -1)
                    break
            }

        let show = false
        if (req.query.show)
            show = req.query.show
        res.render(path.join(__dirname, 'html', 'view', 'fragments', 'post'),
            {
                post: post[0],
                url: req.originalUrl,
                show: show
            })
    } else {
        let posts
        if (topic === 'All topics') {
            posts = await mongo.getPostsBy('visible', true)
        } else {
            posts = await mongo.getPostsByMany(['topic', 'visible'], [topic, true])
        }

        if (posts.length > 0)
            switch (type) {
                //Up rating
                case '0':
                    posts = posts.sort((a, b) => ((a.likes.length - a.dislikes.length) < (b.likes.length - b.dislikes.length)) ? 1 : -1)
                    break

                //Down rating
                case '1':
                    posts = posts.sort((a, b) => ((a.likes.length - a.dislikes.length) > (b.likes.length - b.dislikes.length)) ? 1 : -1)
                    break

                //Old posts
                case '2':
                    posts = posts.sort((a, b) => (a.realTime.localeCompare(b.realTime) <= 0) ? 1 : -1)
                    break

                // New posts
                case '3':
                    posts = posts.sort((a, b) => (a.realTime.localeCompare(b.realTime) > 0) ? 1 : -1)
                    break
            }

        let show = false
        if (req.query.show)
            show = req.query.show

        if (index >= posts.length) {
            res.send('no')
        } else {
            res.render(path.join(__dirname, 'html', 'view', 'fragments', 'post'),
                {
                    post: posts[index],
                    url: req.originalUrl,
                    show: show
                })
        }
    }
})

app.get('/search', async (req, res) => {
    const posts = await mongo.getPosts()
    let word = req.query.word
    const topics = await mongo.getTopics()
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    let tst
    if (req.query.toast)
        tst = JSON.parse(req.query.toast)
    if (word !== '' && posts !== undefined) {
        res.render(path.join(__dirname, 'html', 'view', 'index'),
            {
                topics: topics,
                user: user,
                toast: tst,
                news: JSON.parse(news).results,
                posts: posts.filter(e => (e.title.includes(word) || e.user.includes(word)))
            })
    } else {
        res.render(path.join(__dirname, 'html', 'view', 'index'),
            {
                topics: topics,
                user: user,
                toast: tst,
                news: JSON.parse(news).results,
                posts: []
            })
    }
})

//
// POST -> Creating answer
// SEND -> Resending to '/'
app.post("/createAnswer", async (req, res) =>
{
  const user = await mongo.getUser(req.cookies.login, req.cookies.password)
  if (user.title == null) {
      if (req.body.src.length > 0) {
          let data = {
              id: req.body.id,
              user: {
                  login: req.cookies.login,
                  avatarExtension: user.avatarExtension
              },
              password: req.cookies.password,
              src: req.body.src,
              parent: req.body.parent
          }
          await mongo.createAnswer(data)
      }
      res.redirect(req.body.url)
  } else {
      res.redirect(req.body.url)
  }
})



//
// POST -> Creating post
// SEND -> Resending to '/'
app.post("/createPost", async (req, res) =>
{
  const user = await mongo.getUser(req.cookies.login, req.cookies.password)
  if (user.title == null) {
      mongo.createPost(req.cookies.login, req.cookies.password, req.body)
      res.redirect('/')
  } else {
      user.title = "Unsigned user"
      user.message = "Please login to the site!"
      res.render(path.join(__dirname, 'html', 'view', 'error'),
          {
              error: user
          })
  }
})



app.post("/login", async (req, res) =>
{
  const user = await mongo.getUser(req.body.uname, req.body.password)
  if (user.title == null)
  {
    res.cookie('login', user.login)
    res.cookie('password', user.password)
    await mongo.changeUser(req.body.uname, 'online', true)
    if (user.isConfirmedEmail) {
        res.redirect('/')
    } else {
        let toast = {
            title: "Confirm your email address",
            type: 1,
            message: ""
        }
        toast = encodeURIComponent(JSON.stringify(toast))
        res.redirect('/?toast=' + toast)
    }
  } else {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: user
        })
  }
})



app.post("/register", async (req, res) =>
{
  req.body.barcode = utils.generateBarcode()
  let error = await mongo.createUser(req.body)
  if (error == null) {
    email.sendMail({email: req.body.email, barcode: req.body.barcode, login: req.body.login}, 0)
    res.redirect('login')
  } else {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: error
        })
  }
})



//
// SEND -> like
//
app.get("/dlike", async (req, res) =>
{
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title) {
        res.redirect('back')
    } else {
        mongo.setDLike(req.cookies.login, req.query.id, req.query.type, req.query.likeType)
        res.redirect('back')
    }
})



app.get("/auth", async (req, res) =>
{
  const user = await mongo.getUserBy('login', req.query.login)
  if (user.barcode === req.query.barcode) {
      mongo.changeUser(req.query.login, 'isConfirmedEmail', true)
      let toast = {
          title: "Email successfully confirmed!",
          type: 2,
          message: "Now we can send you password"
      }
      toast = encodeURIComponent(JSON.stringify(toast))
      res.redirect('/?toast=' + toast)
  } else {
      let toast = {
          title: "Wrong barcode or login",
          type: -1,
          message: "Make sure, that you are not changed text in your email message"
      }
      toast = encodeURIComponent(JSON.stringify(toast))
      res.redirect('/?toast=' + toast)
  }
})


//
// GET  -> *.css
// SEND -> *.css file
app.get("/index.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'index.css'))
})
app.get("/register.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'register.css'))
})
app.get("/error.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'error.css'))
})
app.get("/header.css", (req, res) =>
{
    res.sendFile(path.join(__dirname, 'html', 'style', 'header.css'))
})
app.get("/chat.css", (req, res) =>
{
    res.sendFile(path.join(__dirname, 'html', 'style', 'chat.css'))
})
app.get("/commonStyle.css", (req, res) =>
{
    res.sendFile(path.join(__dirname, 'html', 'style', 'commonStyle.css'))
})
app.get("/colors.css", (req, res) =>
{
    res.sendFile(path.join(__dirname, 'html', 'style', 'colors.css'))
})

app.get('/header', async (req, res) => {
    res.render(path.join(__dirname, 'html', 'view', 'fragments', 'header'), {
        user: await mongo.getUser(req.cookies.login, req.cookies.password)
    })
})

app.get('/image', (req, res) => {
    const pth = path.join(__dirname, 'html', 'icons', req.query.img)
    res.sendFile(pth)
})

app.get("/avatar", async (req, res) =>
{
    const pth = path.join(__dirname, 'html', 'icons', 'avatars', req.query.src + req.query.ext)
    if (await fs.checkFileExists(pth))
        res.sendFile(pth)
    else
        res.sendFile(path.join(__dirname, 'html', 'icons', 'profile.png'))
})

app.post("/avatar", async (req, res, next) =>
{
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title) {
        res.render(path.join(__dirname, 'html', 'view', 'error'),
            {
                error: { title: "Your are not entered!", message: "Please login to the site" }
            })
    } else {
        next()
    }
}, multer.imageUpload.single('file'), (req, res, next) =>
{
    const ext = path.extname(req.file.originalname)
    mongo.changeUser(req.cookies.login, 'avatarExtension', ext)
    mongo.changeAnswer({ login: req.cookies.login }, { 'user.avatarExtension': ext })
    res.redirect('/')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



//
// Admin Page
//
app.get('/adminPage', async (req, res) => {
  const user = await mongo.getUser(req.cookies.login, req.cookies.password)
  if (user.isAdmin) {
      res.render(path.join(__dirname, 'html', 'view', 'admin'), {
          user: user
      })
  } else {
      res.redirect('back')
  }
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'style', 'admin.css'))
})
app.get('/adminList', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.isAdmin) {
        let count = parseInt(req.query.count)
        let page  = parseInt(req.query.page)
        switch (parseInt(req.query.type)) {
            case 0: {
                let users = await mongo.getUsersBy('isAdmin', 'false')
                let id = Array.from(Array(users.length).keys())
                users = users.slice(count * page, count * (page + 1))
                switch (req.query.sort) {
                    case 'city-':
                        users = users.sort((a, b) => (a.city > b.city) ? 1 : -1)
                        break

                    case 'city*':
                        users = users.sort((a, b) => (a.city < b.city) ? 1 : -1)
                        break

                    case 'name-':
                        users = users.sort((a, b) => (a.login > b.login) ? 1 : -1)
                        break

                    case 'name*':
                        users = users.sort((a, b) => (a.login < b.login) ? 1 : -1)
                        break
                }
                id = id.slice(count * page, count * (page + 1))
                res.render(path.join(__dirname, 'html', 'view', 'fragments', 'listUsers'), {
                    users: users,
                    id: id
                })
                break
            }

            case 1: {
                let users = await mongo.getUsersBy('isAdmin', 'true')
                let id = Array.from(Array(users.length).keys())
                users = users.slice(count * page, count * (page + 1))

                switch (req.query.sort) {
                    case 'city-':
                        users = users.sort((a, b) => (a.city > b.city) ? 1 : -1)
                        break

                    case 'city*':
                        users = users.sort((a, b) => (a.city < b.city) ? 1 : -1)
                        break

                    case 'name-':
                        users = users.sort((a, b) => (a.login > b.login) ? 1 : -1)
                        break

                    case 'name*':
                        users = users.sort((a, b) => (a.login < b.login) ? 1 : -1)
                        break
                }

                id = id.slice(count * page, count * (page + 1))
                res.render(path.join(__dirname, 'html', 'view', 'fragments', 'listAdmins'), {
                    users: users,
                    id: id
                })
                break
            }

            case 2: {
                let posts = await mongo.getSortedPosts('visible', 1)
                let id = Array.from(Array(posts.length).keys())
                posts = posts.slice(count * page, count * (page + 1))

                switch (req.query.sort) {
                    case 'city-':
                        posts = posts.sort((a, b) => (a.realTime > b.realTime) ? 1 : -1)
                        break

                    case 'city*':
                        posts = posts.sort((a, b) => (a.realTime < b.realTime) ? 1 : -1)
                        break

                    case 'name-':
                        posts = posts.sort((a, b) => (a.user > b.user) ? 1 : -1)
                        break

                    case 'name*':
                        posts = posts.sort((a, b) => (a.user < b.user) ? 1 : -1)
                        break
                }

                id = id.slice(count * page, count * (page + 1))
                res.render(path.join(__dirname, 'html', 'view', 'fragments', 'listPosts'), {
                    posts: posts,
                    id: id
                })
                break
            }
        }
    } else {
        res.redirect('back')
    }
})



//
// Sorting users
//
app.get('/sorted', async (req, res) => {
    let key = req.query.key
    let by = req.query.by
    const users = await mongo.getSortedUsers(key, by)

    res.render(path.join(__dirname, 'html', 'view', 'admin'), {
        username: req.cookies.login,
        users: users
    })
})



//
// Accept or delete post
//
app.get('/postAction', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.isAdmin) {
        let actionType = req.query.key
        let id = req.query.postId
        await mongo.postActions(actionType, id)
        res.redirect('back')
    }
})



//
// Create, edit or delete user
//
app.post('/userAction', async (req, res) => {
    let actionType = req.body.key
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title == null) {
        if (actionType == 2) {
            let changes = req.body
            let id = req.body.Id
            await mongo.editUser(changes, id)
            res.redirect('back')
        }
    }
    if (user.isAdmin) {
        if (actionType == 1) {
            await mongo.createUserByAdmin(req.body)
            res.redirect('back')
        } else if (actionType == 3) {
            let id = req.body.Id

            await mongo.deleteUser(id)
            res.redirect('back')
        }
    }
})

app.post('/forgot', async (req, res) => {
    const user = await mongo.getUserBy('email', req.body.email)
    if (user !== undefined && user.isConfirmedEmail) {
        email.sendMail({email: req.body.email, password: user.password}, 1)
        res.redirect('back')
    }
    else {
        const error = {
            title: "Email not found or wasn't confirmed!",
            message: ""
        }
        res.render(path.join(__dirname, 'html', 'view', 'error'),
            {
                error: error
            })
    }
})

//
// User's Profile
//
app.get('/profile', async (req, res) => {
    let user = await mongo.getUsersBy('login', req.cookies.login)
    user = user[0]
    if (user !== undefined && user.title == null) {
        if (user.password === req.cookies.password && req.query.login === undefined) {
            await mongo.changeUser(req.cookies.login, 'online', true)
            user.online = true
            let fOnlines = []
            for (let i = 0; i < user.friends.length; i++) {
                const friend = await mongo.getUsersBy('login', user.friends[i].login)
                if (friend[0].online) {
                    fOnlines.push(true)
                } else {
                    fOnlines.push(false)
                }
            }
            res.render(path.join(__dirname, 'html', 'view', 'profile'),
                {
                    user: user,
                    fOnlines: fOnlines
                })
        } else {
            let friend = await mongo.getUsersBy('login', req.query.login)
            friend = friend[0]
            if (friend.title == null) {
                res.render(path.join(__dirname, 'html', 'view', 'profileReadOnly'),
                    {
                        user: friend
                    })
            } else {
                res.render(path.join(__dirname, 'html', 'view', 'error'), {
                    error: user
                })
            }
        }
    } else {
        if (user === undefined)
            user = {
                title: "Unknown user",
                message: "Please login!"
            }
        res.render(path.join(__dirname, 'html', 'view', 'error'), {
            error: user
        })
    }
})

app.post('/confirmFriend', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title == null) {
        mongo.friend(req.cookies.login, req.body.friend, 'confirm')
        res.redirect('back')
    } else {
        res.redirect('back')
    }
})
app.post('/deleteFriend', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title == null) {
        mongo.friend(req.cookies.login, req.body.friend, 'delete')
        res.redirect('back')
    } else {
        res.redirect('back')
    }
})

//
// Sign out
//
app.get('/signout', async (req, res) =>
{
    res.cookie('login', -1)
    res.cookie('password', -1)
    mongo.changeUser(req.cookies.login, 'online', false)
    res.redirect('/')
})



//
// Delete answer by admin
//
app.get('/deleteAnswer', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.isAdmin) {
        let answerId = req.query.answerId

        await mongo.deleteAnswer(answerId)
        res.redirect('back')
    }
})



//
// Getting the friends
//
app.get('/chat', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        res.render(path.join(__dirname, 'html', 'view', 'fragments', 'chat', 'chat'), {
            friends: user.friends
        })
    } else {
        res.send('Please login')
    }
})



//
// Getting the chat frame for each friend
//
app.get('/subchat', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        const find = user.friends.find(e => e.login == req.query.friend)
        if (find !== undefined && find.realFriend) {
            const text = chat.getChat(req.cookies.login, req.query.friend)
            let src = text.split('\n')
            let lastMessage
            if (req.query.index[0] === '-') {
                console.log('end')
                res.send()
            }
            if (req.query.index === 'no')
                lastMessage = src.length - 1
            else
                try {
                    lastMessage = parseInt(req.query.index)
                } catch (e) {}
            if (req.query.index === 'no') {
                res.render(path.join(__dirname, 'html', 'view', 'fragments', 'chat', 'subchat'), {
                    text: src[lastMessage],
                    friend: req.query.friend,
                    lastMessage: lastMessage
                })
            } else {
                res.send(src[lastMessage])
            }
        }
    } else {
        res.redirect('back')
    }
})

app.post('/sendMessage', async(req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        const find = user.friends.find(e => e.login == req.body.friend)
        if (find !== undefined && find.realFriend) {
            chat.sendMessage(req.cookies.login, req.body.friend, req.body.src)
            res.redirect('back')
        }
    } else {
        res.redirect('back')
    }
})


app.get('/findFriendWindow', async (req, res) => {
    res.render(path.join(__dirname, 'html', 'view', 'fragments', 'chat', 'findFriend'), {})
})
//
// Search users
//
app.get('/searchFriend', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        let usersByLogin = await mongo.getUsersBy('login', req.query.word)
        let usersByName = await mongo.getUsersBy('name', req.query.word)
        let users = usersByLogin.concat(usersByName)
        if (req.query.word === "\'\'") {
            users = await mongo.getUsersBy('', '')
        }
        for (let i = 0; i < users.length; i++) {
            if (user.friends.find(e => e.login === users[i].login) || user.login === users[i].login) {
                users.splice(i, 1)
                i--
            }
        }
        let id = Array.from(Array(users.length).keys())

        let count = parseInt(req.query.count)
        let page  = parseInt(req.query.page)
        users = users.slice(count * page, count * (page + 1))
        id = id.slice(count * page, count * (page + 1))

        res.render(path.join(__dirname, 'html', 'view', 'fragments', 'chat', 'searchUsers'), {
            users: users,
            id: id
        })
    } else {
        res.redirect('back')
    }
})
//
// Adding friend
//
app.get('/addFriend', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        mongo.friend(req.cookies.login, req.query.friend, 'add')
        res.redirect('back')
    } else {
        res.redirect('back')
    }
})


//
// Send message
//
app.post('/chat', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if(user.title == null) {
        chat
    } else {
        res.redirect('back')
    }
})



//
// Change the social networks
//
app.get('/changeSocialNetworks', async (req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    await mongo.changeSocialNetworks(req.query, user._id)
    res.redirect('back')
})

app.get('/exit', async(req, res) => {
    const user = await mongo.getUser(req.cookies.login, req.cookies.password)
    if (user.title == null) {
        mongo.changeUser(req.cookies.login, 'online', false)
    } else {
        res.send('nologin')
    }
})

//
// Starting server
//
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})
