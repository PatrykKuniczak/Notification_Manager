import avatarIcon from "../icons/avatarIcon.svg";
import {Button} from "../faskForm/TaskFormContainer";
import UserProfileContainer, {
    Avatar,
    UserProfileForm,
    UserProfileInput,
    UserProfileWrapper
} from "./UserProfileContainer";
import {ForwardedRef, forwardRef} from "react";


const UserProfileModal = forwardRef(({changeProfileModalVisibility}: { changeProfileModalVisibility: () => void },
                                     ref: ForwardedRef<HTMLDivElement> | null) => {
        return (<UserProfileWrapper>
            <UserProfileContainer ref={ref}>
                <UserProfileForm>
                    <Avatar src={avatarIcon}/>
                    <label htmlFor="description">Opis</label>
                    <UserProfileInput name="description" placeholder={"Napisz coś o sobie"} autoComplete={"off"}/>
                    <label htmlFor="birthDate">Data urodzenia</label>
                    <UserProfileInput name="birthDate" type={"date"}/>

                    <Button type="button" onClick={changeProfileModalVisibility}>Zapisz</Button>
                </UserProfileForm>
            </UserProfileContainer>
        </UserProfileWrapper>)
    }
)

export default UserProfileModal;