const fs = require('fs');

var articles = [];

var years = fs.readdirSync('./src/components/mainView/articles/');

years.forEach(year => {
    var articleFileNames = fs.readdirSync('./src/components/mainView/articles/' + year); 
    
    articleFileNames.forEach(name => {
        var articleName = name.replace('.vue', '');
        var fullArticlePath = './src/components/mainView/articles/' + year + '/' + name;
        
        var articleContents = fs.readFileSync(fullArticlePath).toString();
        var pubDatePattern = /data-dateNumber="[0-9]{8}"/gi;
        var pubDateMatches = articleContents.match(pubDatePattern);
        
        if(!Array.isArray(pubDateMatches) || pubDateMatches.length !== 1) {
            throw 'Could not parse publishing date from file : ' + fullArticlePath;
        }
        
        var pubDateNumber = pubDateMatches[0].replace('data-dateNumber="', '')
                .replace('"', '');

        articles.push({
            componentPath: '' + year + '/' + articleName,
            fullUrlPath: '/blog/articles/' + year + '/' + articleName,
            blogRelativePath: year + '/' + articleName,
            year: parseInt(year),
            publishingDateNumber: parseInt(pubDateNumber),
            title: articleName.replace(/([A-Z])/g, ' $1').trim()
        });
    });
});

fs.writeFile('./src/components/services/articlesRepo.json', JSON.stringify(articles), (err) => {
    if(err) throw err;
});