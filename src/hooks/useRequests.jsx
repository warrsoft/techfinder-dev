import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Storage from "../storage/app-storage";
import { ROLES } from "../constants/roles";

export const useRequests = (role) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {

    let data = null;

      if(role === ROLES.USER) {
        data = await Storage.getRequestByUserId();
      } else if (role === ROLES.TECH) {
        data = await Storage.getRequestByTechId();
      }
      
    if (!data) {
      console.error("Error fetching requests:");
    } else {
      setRequests(data);
    }
  };

  useEffect(() => {

    fetchRequests();

    const channel = supabase
      .channel("requests-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests" }, fetchRequests)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);
  

  return requests;
};