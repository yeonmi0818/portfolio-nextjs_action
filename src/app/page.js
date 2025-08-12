"use client";
import Image from "next/image";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [projects,setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const supabase = createClient();
    (async ()=>{
      const {data, error} = await supabase
      .from("portfolio")
      .select()
      .order('id', { ascending: false })
      .limit(3);
      setProjects(data);
      if(error) setError(error.message);
     })();
    
  },[]); //최초 한번 실행


  const getPublicURL = (path)=>{
    const supabase = createClient();
    const { data } = supabase
    .storage
    .from('portfolio')
    .getPublicUrl(path);
    return data.publicUrl;
  }  




  if(error){
    console.log('데이터 조회 실패', error);
    return <div>데이터 조회 실패</div>
  }

  return (
    <>
      <div className="container latest_portfolio">
        <div className="row intro">
            <div className="col-md-4">
                <div className="contents shadow">
                    <h2 className="heading2">I&apos;m alikerock</h2>
                </div>
            </div>
            <div className="col-md-4">
                <div className="contents shadow">
                    <h2 className="heading2">I create super awesome stuff</h2>
                </div>
            </div>
            <div className="col-md-4">
                <div className="contents shadow">
                    <h2 className="heading2">I&apos;m available for freelance projects</h2>
                </div>
            </div>
        </div>
        <div className="row list">
          {
            projects.map(item=> 
              <div className="col-md-4" key={item.id}>
                <div className="contents shadow">
                    <Image src={getPublicURL(item.thumbnail)} width={364} height={209} alt={item.title} />
                    <div className="hover_contents">
                        <div className="list_info">
                            <h3>
                              <Link href={{ pathname: "/project", query: { id: item.id } }}>
                                {item.title}
                              </Link>
                              <Image src="/images/portfolio_list_arrow.png" width={6} height={8} alt="list arrow"/>
                            </h3>
                            <p>
                              <Link href={{ pathname: "/project", query: { id: item.id } }}>
                                Click to see project
                              </Link>                             
                            </p>
                        </div>
                    </div>
                </div>
              </div>          
            )
          }
                     
        </div>
        <p className="porfolio_readmore">
            <a href="" className="primary-btn">See my full portfolio</a>        
        </p>
    </div>
    </>
  );
}
