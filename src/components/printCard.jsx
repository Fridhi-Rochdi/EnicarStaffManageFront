import React from "react";
import { Link } from "react-router-dom";
import DateFormatter from "./dateFormatter";

export default function PrintCard({
  id,
  title,
  description,
  actProf,
  totalNumber,
  createdDate = "01-01-1970",
  goalDuration,
}) {
  return (
    //link to={C_GOAL_DETAILS.replace(":goalid", id)}
    <React.Fragment>
      <Link className="relative block overflow-hidden rounded-lg border-2 border-gray-100 hover:border-indigo-400 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="mt-1 text-xs font-medium text-gray-600">
              Ticket Id: {id}
            </p>
            {goalDuration != undefined && (
              <p className="mt-1 text-xs font-medium text-gray-600">
                Ticket Duration: {goalDuration}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-700">{description}</p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6 justify-end ">
          <div className="flex flex-col-reverse justify-center text-center">
            <dd className="text-xs text-gray-500"> Creation Date </dd>
            <dt className="text-sm font-medium text-gray-600">
              {" "}
              <DateFormatter timestamp={createdDate} />
            </dt>
          </div>

          {actProf !== undefined && (
            <div className="flex flex-col-reverse justify-center text-center">
              <dd className="text-xs text-gray-500">Active participations</dd>
              <dt className="text-sm font-medium text-gray-600">{actProf}</dt>
            </div>
          )}
          {totalNumber !== undefined && (
            <div className="flex flex-col-reverse justify-center text-center">
              <dd className="text-xs text-gray-500">Copies</dd>
              <dt className="text-sm font-medium text-gray-600">
                {totalNumber}
              </dt>
            </div>
          )}
        </dl>
      </Link>
    </React.Fragment>
  );
}
