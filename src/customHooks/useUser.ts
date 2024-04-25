import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../axios.config";

interface User {
  first_name: string;
  last_name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  _id: string;
}
const useUser = (userId: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const user = await (
            await axios.get(baseUrl + "/user/" + userId)
          ).data;
          setUser(user);
        } catch (e) {}
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { user, isLoading };
};

export default useUser;
