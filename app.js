const express = require('express');
const path = require('path');
const fs = require('fs');
// const ejs = require('ejs');

const RUTA_MUSICA = path.join( __dirname, 'src/public/musica' );

const app = express();

// Settings
app.set('port', 3000);
app.use( express.static( path.join( __dirname, '/src/public' ) ) );
app.set('views', path.join( __dirname , 'src/views' ) );
app.set('view engine', 'ejs');

// Middlewares

// Routes
app.get('/', (req, res)=>{

    let files = [];

    // Listar archivos
    fs.readdir( RUTA_MUSICA , function (err, archivos) {
        if (err) {
        onError(err);
        return;
        }

        res.render( 'index.ejs' , {"canciones" : archivos} );

    });
    
    // res.sendFile( path.join( __dirname, '/src/views/index.html' ) );

});



app.listen( app.get('port'), ()=>{
    console.log('Server running on', app.get('port') );
});

