// Dependencies
import axios from "axios";

export const finishConfigurationService = async() => {
    const url = '/station/pump/completePumpCreationLazo'
    return await axios(
            {
                method: "post",
                url: url,
            }
        );
}