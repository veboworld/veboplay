import EgyBestScraper from "../services/scraping/egybest"

export class SearchController {

    static index(req: any, res: any) {
        res.json(EgyBestScraper);
    }

}