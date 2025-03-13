import axios from "axios";

export const RadioPOCAPI = {
  SponsorData: async () => {
    try {
      const res = await axios.get(
        "https://expenseapp.creowiz.com/api/get_sponsor_names/"
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      throw "Total Registration Failed";
    }
  },
  SponsonsorOccurance: async () => {
    try {
      const res = await axios.get(
        "https://expenseapp.creowiz.com/api/get_sponsor_occurence/"
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      throw "Sponsor Occurrence Failed";
    }
  },
};
