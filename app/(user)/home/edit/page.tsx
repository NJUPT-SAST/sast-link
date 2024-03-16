"use client";
import { Button } from "@/components/button";
import { Icon, avatarIcon, cameraIcon } from "@/components/icon";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { message } from "@/components/message";
import { uploadAvatar, EditProfile } from "@/lib/apis/user";
import { useAppSelector } from "@/redux";
import styles from "./page.module.scss";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { SelectedFiles } from "use-file-picker/dist/interfaces";
import { map } from "@/constant/department";
import { useRouter } from "next/navigation";
import Back from "@/components/back";
import PageTransition from "@/components/pageTransition";
import AvatarEditor from "react-avatar-editor";

const Edit = () => {
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarScale, setAvatarScale] = useState<number>(1);
  const route = useRouter();
  const croperRef = useRef(null);
  const { register, handleSubmit, control, getValues, setValue } = useForm<any>(
    {
      defaultValues: {
        nickname: userBasicInfo.nickname,
        bio: userBasicInfo.bio,
        link1: userBasicInfo.link === null ? "" : userBasicInfo.link[0],
        link2: userBasicInfo.link === null ? "" : userBasicInfo.link[1],
        link3: userBasicInfo.link === null ? "" : userBasicInfo.link[2],
      },
    },
  );
  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: "image/*",
    onFilesSuccessfullySelected: (files: SelectedFiles<ArrayBuffer>) => {
      setAvatarFile(files.plainFiles[0]);
      // uploadAvatar(files.plainFiles[0]).then((res) => {
      //   message.success('上传成功')
      // }).catch((err) => {
      //   message.error('上传失败')
      // })
    },
  });
  const handleAvatarUpdate = () => {
    setUploadLoading(true);
    if (croperRef.current) {
      const canvasScaled = (croperRef.current as any).getImageScaledToCanvas();
      canvasScaled.toBlob((blob: Blob) => {
        if (blob) {
          uploadAvatar(blob)
            .then((res) => {
              message.success("上传成功, 审核中");
              setAvatarFile(null);
              setUploadLoading(false);
              route.refresh();
            })
            .catch((err) => {
              message.error("上传失败");
              setUploadLoading(false);
              setAvatarFile(null);
            });
        }
      });
    }
  };
  useEffect(() => {
    setValue("nickname", userBasicInfo.nickname);
    setValue("bio", userBasicInfo.bio);
    setValue("link1", userBasicInfo.link === null ? "" : userBasicInfo.link[0]);
    setValue("link2", userBasicInfo.link === null ? "" : userBasicInfo.link[1]);
    setValue("link3", userBasicInfo.link === null ? "" : userBasicInfo.link[2]);
  }, [userBasicInfo]);
  const [editMEssage, setEditMessage] = useState({
    nickname: userBasicInfo.nickname,
    org_id: ((dep: string | null, org: string | null) => {
      if (dep === null) return null;
      for (let i = 0; i < 19; i++) {
        if (dep === map[i][0] && org === map[i][1]) return i + 1;
      }
      for (let i = 19; i < map.length; i++) {
        if (dep === map[i][0]) return i + 1;
      }
      return null;
    })(userBasicInfo.dep, userBasicInfo.org),
    bio: userBasicInfo.bio,
    link: userBasicInfo.link,
    hide: userBasicInfo.hide,
  });
  const handleInfoSubmit = (form: {
    nickname: string;
    bio: string;
    link1: string;
    link2: string;
    link3: string;
  }) => {
    setUpdateLoading(true);
    EditProfile({
      nickname: form.nickname,
      bio: form.bio,
      link: [form.link1, form.link2, form.link3],
    })
      .then((res) => {
        setUpdateLoading(false);
        message.success("修改成功");
      })
      .catch((err) => {
        setUpdateLoading(false);
        message.error("修改失败");
      });
  };
  return (
    <>
      {!avatarFile ? (
        <PageTransition className={styles.settingPanelList}>
          <div className={classNames(styles.settingPanel)}>
            <Back />
            <div className={styles.settingPanelTitle}>头像设置</div>
            <div className={classNames(styles.avatar)}>
              <Icon
                src={userBasicInfo.avatar ?? avatarIcon.src}
                style={{ objectFit: "cover" }}
                alt="avatar"
                width={145}
                height={145}
              />
            </div>
            <div className={styles.formContainer}>
              <Button
                onClick={() => {
                  openFilePicker();
                }}
                className={classNames(styles.button)}
              >
                <Icon {...cameraIcon} />
                更换头像
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleInfoSubmit)}>
            <div className={classNames(styles.settingPanel)}>
              <div className={styles.settingPanelTitle}>编辑信息</div>
              <div className={styles.formContainer}>
                <InputWithLabel
                  className={classNames(styles.input)}
                  label={"昵称"}
                  {...register("nickname")}
                  inputProps={register("nickname")}
                  error={{ error: false }}
                />
              </div>
              <div className={styles.formContainer}>
                <InputWithLabel
                  className={classNames(styles.input)}
                  label={"个人简介"}
                  {...register("bio")}
                  inputProps={register("bio")}
                  error={{ error: false }}
                  defaultValue={userBasicInfo.bio ?? ""}
                />
              </div>
              <div className={styles.settingPanelTitle}>社交链接</div>
              <div className={styles.formContainer}>
                <InputWithLabel
                  className={classNames(styles.input)}
                  label={"社交链接"}
                  {...register("link1")}
                  inputProps={register("link1")}
                  error={{ error: false }}
                  defaultValue={
                    userBasicInfo.link === null ? "" : userBasicInfo.link[0]
                  }
                />
                <InputWithLabel
                  className={classNames(styles.input)}
                  label={"社交链接"}
                  {...register("link2")}
                  inputProps={register("link2")}
                  error={{ error: false }}
                  defaultValue={
                    userBasicInfo.link === null ? "" : userBasicInfo.link[1]
                  }
                />
                <InputWithLabel
                  className={classNames(styles.input)}
                  label={"社交链接"}
                  {...register("link3")}
                  inputProps={register("link3")}
                  error={{ error: false }}
                  defaultValue={
                    userBasicInfo.link === null ? "" : userBasicInfo.link[2]
                  }
                />
              </div>
              <div className={styles.formContainer}>
                <Button
                  loading={updateLoading}
                  type="submit"
                  className={classNames(styles.button)}
                >
                  提交
                </Button>
              </div>
            </div>
          </form>
        </PageTransition>
      ) : (
        <PageTransition
          style={{ alignItems: "center" }}
          className={styles.settingPanelList}
        >
          <AvatarEditor
            image={avatarFile}
            width={200}
            height={200}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={avatarScale}
            rotate={0}
            borderRadius={100}
            ref={croperRef}
            className={styles.avatarEditor}
          />
          <input
            type="range"
            min={1}
            max={5}
            step={0.01}
            value={avatarScale}
            onChange={(value) => {
              setAvatarScale(Number(value.target.value));
            }}
          />
          <Button loading={uploadLoading} onClick={handleAvatarUpdate}>
            确认提交
          </Button>
        </PageTransition>
      )}
    </>
  );
};

export default Edit;
