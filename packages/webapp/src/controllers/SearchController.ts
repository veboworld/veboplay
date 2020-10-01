import EgyBestScraper from "../services/scraping/egybest"

export class SearchController {

    static index(req, res) {
        res.json(EgyBestScraper);
    }

}