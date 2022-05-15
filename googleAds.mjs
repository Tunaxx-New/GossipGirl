import { GoogleAdsApi } from "google-ads-api";

//Google-Ads----------------------------------
const client = new GoogleAdsApi({
  client_id: "1030700938715-fkvs84gmiiuid7pndu57joe2etmjrqu0.apps.googleusercontent.com",
  client_secret: "<CLIENT-SECRET>",
  developer_token: "<DEVELOPER-TOKEN>",
});
const customer = client.Customer({
  customer_id: "1234567890",
  refresh_token: "<REFRESH-TOKEN>",
});

import { resources, enums, ResourceNames } from "google-ads-api";

const ad = new resources.Ad({
  expanded_text_ad: {
    headline_part1: "Cruise to Mars",
    headline_part2: "Best Space Cruise Line",
    description: "Buy your tickets now!",
    path1: "cruises",
    path2: "mars",
  },
  final_urls: ["https://example.com"],
  type: enums.AdType.EXPANDED_TEXT_AD,
});

console.log(ad)

//--------------------------------------------
