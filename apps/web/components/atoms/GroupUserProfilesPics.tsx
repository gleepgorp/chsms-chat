import { ProfileType } from "types/Profile.type";
import { extractInitials } from "../../utils";
import ChatProfilePicture, { ProfileVariant } from "./ChatProfilePicture";

type GroupUserProfilePics = {
  group?: boolean;
  noChatName?: boolean;
  participants: ProfileType[];
  size?: ProfileVariant;
}

export default function GroupUserProfilePics(props: GroupUserProfilePics): JSX.Element {
  const { group, noChatName, participants, size } = props;

  const userProfilePics = participants.map((user, index) => {
    const one = index === 1;
    const zero = index === 0;

    return (
      <div 
        key={index} 
        className={`
            ${group && 'pt-1'}
            ${one && 'absolute -top-0.5 left-3'}
            ${zero && 'absolute top-2'}
          `}
        >
        <ChatProfilePicture 
          group={group}
          noChatName={noChatName}
          profile={user.profilePicture === "" ? user.profileBgColor : user.profilePicture}
          firstnameInitial={extractInitials(user.firstname)}
          lastnameInitial={extractInitials(user.lastname)}
          variant={size}
        />
      </div>
    )
  });

  return (
    <>{userProfilePics.splice(0,2)}</>
  )
}