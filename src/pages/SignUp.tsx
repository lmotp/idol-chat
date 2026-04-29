import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BackBar from "@/components/BackBar";
import { apiClient } from "@/app/apiClient";
import {
  buildAuthResponseFromProfile,
  createProfilePayloadFromUser,
  getAuthErrorMessage,
  normalizeEmail,
  DEFAULT_PROFILE_IMG,
} from "@/app/authHelpers";
import LocationModal from "@/components/Modal/LocationModal";
import Modal from "@/components/Modal/Modal";
import {
  AuthButton,
  AuthButtonWrap,
  ErrorValue,
  Form,
  Input,
  InputWrap,
  Label,
  LocationButton,
  SignUpItemBox,
} from "@/design-system/styles/FormStyle";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { BiCurrentLocation } from "react-icons/bi";
import { overlay } from "overlay-kit";
import type { ChangeEvent, FormEvent } from "react";
import { supabase, hasSupabaseConfig } from "@/app/supabaseClient";
import useAppStore from "@/stores/useAppStore";
import type { AuthResponse } from "@/types/domain/user";
import type { SupabaseProfileRow } from "@/types/domain/supabase";

const SignContainer = styled.section`
  width: 100%;
  height: 100vh;
`;

const Point = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 4px;
`;

const LabelGender = styled.label<{ $active?: boolean }>`
  padding: 12px 20px;
  margin-top: 10px;
  margin-right: 6px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#fff" : "rgb(196, 196, 196)")};
  background: ${({ $active }) => ($active ? "black" : "transparent")};
  border: 1px solid rgb(196, 196, 196);
  cursor: pointer;
  display: inline-block;
  border-radius: 3px;
`;

const InputCheckBox = styled.input`
  display: none;
`;

export const SignUp = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [radioSelect, setRadioSelect] = useState("nothing");
  const [nowLocation, setNowLocation] = useState("");
  const { resolveCurrentLocation } = useCurrentLocation();
  const setUser = useAppStore((state) => state.setUser);

  const handleCurrentLocation = async () => {
    const address = await resolveCurrentLocation();
    setNowLocation(address);
    return address;
  };

  // 모달창 함수
  const openLocationModal = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="현재 위치 선택">
        <LocationModal setNowLocation={setNowLocation} onClose={close} onUseCurrentLocation={handleCurrentLocation} />
      </Modal>
    ));
  };

  // 회원가입시 에러 잡는함수
  const errorFunc = (code: number, message: string) => {
    setErrorMessage(message);
    setErrorCode(code);
  };

  // 성별 바꾸는 함수
  const radioCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioSelect(e.target.id);
  };

  // 회원가입
  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const pswRgx = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/;
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicknameRgx = /^\S{1,8}$/;

    const passwordConfirm = passwordConfirmRef.current?.value ?? "";

    const info = {
      email: normalizeEmail(emailRef.current?.value ?? ""),
      password: passwordRef.current?.value ?? "",
      nickname: nicknameRef.current?.value ?? "",
      gender: radioSelect,
      location: nowLocation,
    };

    if (!info.email || !emailRgx.test(info.email)) {
      return errorFunc(0, "이메일 형식에 맞게 작성해주세요.");
    } else if (!info.password || !passwordConfirm) {
      return errorFunc(1, "비밀번호를 입력해주세요");
    } else if (info.password !== passwordConfirm) {
      return errorFunc(2, "비밀번호가 일치하지 않습니다.");
    } else if (!info.nickname || !nicknameRgx.test(info.nickname)) {
      return errorFunc(3, "닉네임에 공백 없이 8자이하로 입력해주세요");
    } else if (!info.location) {
      return errorFunc(5, "주소창을 선택해서 입력해주세요");
    } else if (!pswRgx.test(info.password)) {
      return errorFunc(4, "비밀번호는 8자리 이상으로 16자리 이하, !@#$%^&*를 포함해서 입력해주세요");
    } else {
      setErrorCode(999);
      setIsSubmitting(true);

      try {
        if (hasSupabaseConfig && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email: info.email,
            password: info.password,
            options: {
              emailRedirectTo: `${window.location.origin}/login`,
              data: {
                nickname: info.nickname,
                gender: info.gender,
                location: info.location,
                myself: "안녕하세요? 잘 부탁드립니다",
                profileimg: DEFAULT_PROFILE_IMG,
              },
            },
          });

          if (error || !data.user) {
            throw error ?? new Error("회원가입에 실패했습니다.");
          }

          if (data.session) {
            const payload = createProfilePayloadFromUser(data.user, info.email, {
              nickname: info.nickname,
              gender: info.gender,
              location: info.location,
              myself: "안녕하세요? 잘 부탁드립니다",
              profileimg: DEFAULT_PROFILE_IMG,
            });

            const { error: upsertError } = await supabase.from("profiles").upsert(payload);
            if (upsertError) {
              const response = buildAuthResponseFromProfile(payload as SupabaseProfileRow);
              setUser(response);
              navigate(response.firstCategory ? "/pages/home" : "/category");
              return;
            }

            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("id,email,nickname,profileimg,myself,gender,location,first_category,category,login_time")
              .eq("id", data.user.id)
              .single();

            if (profileError || !profile) {
              throw profileError ?? new Error("프로필을 찾을 수 없습니다.");
            }

            const response: AuthResponse = buildAuthResponseFromProfile(profile);
            setUser(response);
            navigate(response.firstCategory ? "/pages/home" : "/category");
            return;
          }

          window.alert("회원가입이 완료되었습니다. 이메일 인증을 확인한 뒤 로그인해주세요.");
          navigate("/login");
          return;
        }

        const { data } = await apiClient.post<{ success: boolean; message?: string }>("/api/auth/signup", info);

        if (data.success) {
          navigate("/");
        } else {
          window.alert(data.message);
        }
      } catch (err) {
        window.alert(getAuthErrorMessage(err, "회원가입에 실패했습니다."));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SignContainer>
      <BackBar title="회원가입" />
      <Form pd="20px 20px 0 " onSubmit={signUp}>
        <InputWrap>
          <Label htmlFor="email">이메일</Label>
          <Point>*</Point>
          <Input type="text" id="email" placeholder="이메일을 입력해주세요." ref={emailRef} autoComplete="off"></Input>
          {errorCode === 0 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password">비밀번호</Label>
          <Point>*</Point>
          <Input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            ref={passwordRef}
          ></Input>
          {errorCode === 1 ? (
            <ErrorValue>{errorMessage}</ErrorValue>
          ) : errorCode === 4 ? (
            <ErrorValue>{errorMessage}</ErrorValue>
          ) : null}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password-confirm">비밀번호 확인</Label>
          <Point>*</Point>
          <Input
            autoComplete="off"
            type="password"
            id="password-confirm"
            placeholder="비밀번호를 한번 더 입력해주세요."
            ref={passwordConfirmRef}
          ></Input>
          {errorCode === 2 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="nickname">닉네임</Label>
          <Point>*</Point>
          <Input type="text" id="nickname" placeholder="닉네임을 입력해주세요." ref={nicknameRef}></Input>
          {errorCode === 3 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="nothing">성별</Label>
          <SignUpItemBox>
            <InputCheckBox
              type="radio"
              id="nothing"
              name="gender"
              checked={radioSelect === "nothing"}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="nothing" $active={radioSelect === "nothing"}>
              선택안함
            </LabelGender>

            <InputCheckBox
              type="radio"
              id="men"
              name="gender"
              checked={radioSelect === "men"}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="men" $active={radioSelect === "men"}>
              남성
            </LabelGender>

            <InputCheckBox
              type="radio"
              id="women"
              name="gender"
              checked={radioSelect === "women"}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="women" $active={radioSelect === "women"}>
              여성
            </LabelGender>
          </SignUpItemBox>
        </InputWrap>

        <InputWrap>
          <Label htmlFor="location">현재위치</Label>
          <SignUpItemBox>
            <Input
              autoComplete="none"
              type="text"
              id="location"
              placeholder="클릭해서 현재 위치를 알려주세요"
              value={nowLocation}
              onChange={(e) => setNowLocation(e.target.value)}
              onClick={openLocationModal}
              cursor="pointer"
              readOnly
            ></Input>
            <LocationButton
            onClick={(e) => {
              e.preventDefault();
              void handleCurrentLocation().catch((err) => {
                console.log(err);
              });
            }}
            >
              <BiCurrentLocation size="24px" />
            </LocationButton>
          </SignUpItemBox>
          {errorCode === 5 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <AuthButtonWrap>
          <AuthButton color="black" margin="0" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "가입 중..." : "가입하기"}
          </AuthButton>
        </AuthButtonWrap>
      </Form>
    </SignContainer>
  );
};
