import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

export class CurrentUser extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const { userId } = this.props;
    const user = await getUser(userId);

    this.setState({ user });
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        {!user
          ? <Loader />
          : (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  {`Selected user: ${user.id}`}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>

              <button
                className="CurrentUser__clear"
                type="button"
                onClick={this.props.clearUser}
              >
                Clear
              </button>
            </>
          )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
