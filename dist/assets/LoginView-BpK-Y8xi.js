import{_ as B,r as o,c as m,a as t,o as f,w as r,b as v,t as N,d as C,e,f as I,g as n,h as L,A as S,i as T}from"./index-GbV0-74n.js";const A={__name:"LoginView",setup(D){const l=o(""),i=o(!1),c=o(!1),p=o(""),d=o(!1),_=[a=>!!a||"شماره همراه نمی‌تواند خالی باشد",a=>/^\d{11}$/.test(a)||"شماره همراه باید 11 رقم باشد",a=>a.startsWith("09")||"شماره همراه باید با 09 شروع شود"],b=()=>{l.value=l.value.replace(/\D/g,"").slice(0,11)},g=async()=>{try{c.value=!0;const a=await S.Login(l.value);return T.push("/OTP"),a}catch(a){p.value=a.response.data.msg||"خطایی رخ داده است!",d.value=!0,setTimeout(()=>{d.value=!1},5e3)}finally{c.value=!1}};return(a,s)=>{const V=t("v-alert"),w=t("v-text-field"),x=t("v-sheet"),y=t("v-btn"),h=t("v-form"),k=t("v-card");return f(),m(k,{class:"auth-card","max-width":"360",width:"100%"},{default:r(()=>[d.value?(f(),m(V,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:r(()=>[v(N(p.value),1)]),_:1})):C("",!0),s[3]||(s[3]=e("div",{class:"k-stepper"},[e("div",{class:"step active"},[e("div",null,[e("span",{class:"circle"})]),e("p",{class:"mb-0"},"ورود")]),e("div",{class:"divider active"}),e("div",{class:"step"},[e("div",null,[e("span",{class:"circle"})]),e("p",{class:"mb-0"},"تایید شماره")]),e("div",{class:"divider"}),e("div",{class:"step"},[e("div",null,[e("span",{class:"circle"})]),e("p",{class:"mb-0"},"ثبت اطلاعات")]),e("div",{class:"divider"}),e("div",{class:"step"},[e("div",null,[e("span",{class:"circle"})]),e("p",{class:"mb-0"},"احراز هویت")])],-1)),s[4]||(s[4]=e("img",{src:I,alt:"خانه طلا",class:"my-5"},null,-1)),s[5]||(s[5]=e("h3",null,"ورود به حساب کاربری",-1)),n(h,{ref:"form",modelValue:i.value,"onUpdate:modelValue":s[1]||(s[1]=u=>i.value=u),onSubmit:L(g,["prevent"]),class:"auth-form"},{default:r(()=>[n(x,{color:"surface"},{default:r(()=>[n(w,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=u=>l.value=u),type:"text",label:"شماره همراه",variant:"outlined",rules:_,onInput:b,class:"k-textfield"},null,8,["modelValue"])]),_:1}),n(y,{type:"submit",class:"my-6",height:"40",text:"ارسال کد تایید",variant:"elevated",width:"100%",color:"#B0863B",disabled:!i.value,loading:c.value},null,8,["disabled","loading"]),s[2]||(s[2]=e("p",{class:"site-url"},[v("آدرس رسمی سامانه"),e("span",{class:"k-primary"}," www.khanetala.ir "),v("میباشد")],-1))]),_:1},8,["modelValue"])]),_:1})}}},P=B(A,[["__scopeId","data-v-330e0ad7"]]);export{P as default};
