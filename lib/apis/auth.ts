import {use} from "react";
import {apis} from "./index";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import axios from "axios";

interface oAuthType {
    /**
     * 客户端Id
     */
    client_id: string | null;
    code_challenge: string | null;
    code_challenge_method: string | null;
    /**
     * 任务完成后重定向的链接
     */
    redirect_uri: string | null;
    /**
     * 授权码模式
     */
    response_type: string | null;
    scope: string | null;
    state: string | null;
}

export function oAuth(data: oAuthType) {
    const queryArray: string[] = [];
    Object.keys(data).forEach((key) => {
        if ((data as any)[key]) queryArray.push(`${key}=${(data as any)[key]}`);
    });
    const formData = new FormData();
    const token = localStorage.getItem('Token')?.split('"')[1];
    formData.append("token", token ?? '')
    const query = queryArray.join("&") + '&' + 'part=' + localStorage.getItem('Token')?.split('"')[1];
    return window.location.href = `/apis/oauth2/authorize?${query}`
}
