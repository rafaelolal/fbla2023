import useSWR from "swr";
import DashboardRedemption from "./redemption";
import { toast } from "react-toastify";
import client from "../../../api/apollo-client";
import { gql } from "@apollo/client";
import { useState } from "react";

export default function DashboardRedemptionList() {
  const [prizeRedemptions, setPrizeRedemptions] = useState([]);
  const { data, error, mutate } = useSWR(client, async (url) => {
    return await client
      .query({
        query: gql`
          query {
            listPrizeRedemptions {
              id
              redeemedOn
              prize {
                name
                type
                cost
              }
              student {
                email
              }
            }
          }
        `,
      })
      .then((response) => {
        setPrizeRedemptions(response.data.listPrizeRedemptions);
        return response.data.listPrizeRedemptions;
      })
      .catch((error) => {
        toast.success(
          `/listPrizeRedemptions/ (${error.code}): ${error.message}`
        );
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8 my-4 p-0">
          <div className="container-fluid neoBorder my-5 bg-light">
            <div className="row justify-content-around py-3 px-3 border-bottom border-top bg-primary">
              <div className="col-2 d-flex border-end">
                <h5 className="m-auto">Student</h5>
              </div>

              <div className="col-2 d-flex border-end">
                <h5 className="m-auto">Name</h5>
              </div>

              <div className="col-2 d-flex border-end">
                <h5 className="m-auto">Cost</h5>
              </div>

              <div className="col-2 d-flex border-end">
                <h5 className="m-auto">Redeemed On</h5>
              </div>

              <div className="col-1 d-flex">
                <h5 className="m-auto">Action</h5>
              </div>
            </div>

            {prizeRedemptions &&
              prizeRedemptions.map((redemption, i: number) => (
                <DashboardRedemption
                  key={i}
                  studentName={redemption.student.email}
                  name={redemption.prize.name}
                  type={redemption.prize.type}
                  cost={redemption.prize.cost}
                  redeemedOn={redemption.redeemedOn}
                  prizeRedemptions={prizeRedemptions}
                  setPrizeRedemptions={setPrizeRedemptions}
                  mutate={mutate}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
