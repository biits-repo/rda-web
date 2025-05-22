import axios from "axios";

export const RadioPOCAPI = {
  SponsorData: async () => {
    try {
      const res = await axios.get(
        "https://expenseapp.creowiz.com/api/get_sponsor_names/"
      );
      if (res.status === 200) {
        return res.data.results;
      }
    } catch (error) {
      throw "Total Registration Failed";
    }
  },
  RegistrationApi: async (data) => {
    try {
      const res = await axios.post(
        "https://expenseapp.creowiz.com/api/register_radio_user/",
        {
          username:data.username,
          email:data.email,
          first_name:data.firstname,
          last_name:data.lastname,
          password:data.password,
          group:data.role,
        }
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      throw "Registration Failed";
    }
  },
};
