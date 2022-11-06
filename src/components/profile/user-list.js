import React from "react";
import {Link} from "react-router-dom";

export const UserList = ({users}) => {
  return (
      <div>
        {
          users.map(user => {
            return (
                <Link>
                  {user.username}
                  <button>
                    <i className="fas fa-remove"></i>
                  </button>
                </Link>
            )
          })
        }
      </div>
  );
};

