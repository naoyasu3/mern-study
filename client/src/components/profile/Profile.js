import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class='profile-exp bg-white p-2'>
              <h2 class='text-primary'>職務経験</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>職務経験の登録はありません</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 class='text-primary'>学歴</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu, index) => (
                    <ProfileEducation key={index} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>学歴の登録はありません</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
