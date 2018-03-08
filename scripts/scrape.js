// module.exports = {
//     scrap: function () {
//         var results = [];

//         axios.get("https://www.sciencefriday.com/topics/nature/").then(function (response) {

//             var $ = cheerio.load(response.data);

//             $(".series-podcast-segment").each((i, element) => {
//                 var title = $(element).find(".cb-content").find("h2").text();
//                 var runTime = $(element).find(".cb-content").find(".run-time").text();
//                 var readMore = $(element).find(".cb-content").find(".more").attr("href");
//                 var img = $(element).find(".cb-thumb").find(".cb-thumb-contain").find(".b-lazy").attr("data-src");
//                 var text = $(element).find(".cb-desc").find("p").text();
//                 var listen = $(element).find(".cb-content").find(".playlistitem").attr("href");

//                 results.push({
//                     title: title,
//                     runTime: runTime,
//                     readMore: readMore,
//                     img: img,
//                     text: text,
//                     listen: listen
//                 });
//             });

//             console.log(results)
//             db.Podcast.create(results)
//                 .then(function (data) {
//                     console.log(data);
//                 })
//                 .catch(function (err) {
//                     res.json(err);
//                 });
//         })

//     }
// }