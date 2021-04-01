import Head from 'next/head'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './../styles/home.module.css';

interface TodoList {
  texto    : string;
  isMarked : boolean;
  date     : string;
}

export default function Home() {

  function onSubmit(event : FormEvent){
    event.preventDefault();
    const l = {texto : text, isMarked : marked, date : (new Date()).toLocaleDateString()}
    list ? setList( [...list, l] ) : setList( [l] );

    //limpar Formulario
    setText("");
    setMarked(false);
  }
  function mudarTema(){

  }
  function criarItem(l : TodoList){
    return (
      <div key={l.texto+'div'} className={styles.item}>
        <label key={l.texto+'p'} >
          {l.isMarked ? 
            <input id="marked" key={l.texto+'input'} onChange={() => marcarToDo( l.texto )} type="checkbox" checked/>
          :
            <input id="marked" key={l.texto+'input'} onChange={() => marcarToDo( l.texto )} type="checkbox"/>
          }
          <p>{l.texto}</p>
        </label>
        <a onClick={() => excluirToDo(l.texto)} ><Image src="/icon/icon-cross.svg" alt="excluir" layout="fixed" width={20} height={20} /></a>
      </div>
    );
  }
  function marcarToDo( key : string){
      list.map(l => {
      if(l.texto === key){
        l.isMarked = l.isMarked ? false : true;
        console.log(l.isMarked);
      }
    });
    setList([...list]);
  }
  function excluirToDo(key : string){
      const ToDoRemoved = list.splice( list.findIndex(l => l.texto === key), 1 );
      setList([...list]);
      console.log(ToDoRemoved[0]?.texto);
  }

  const [list, setList] = useState<TodoList[]>();
  const [listFiltred, setListFiltred] = useState<TodoList[]>();
  const [filters, setFilters] = useState(0);
  const [text, setText] = useState("");
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if(!list)
       setListFiltred(undefined);

    switch(filters){
      case 0 : {
          setListFiltred( list );
        break;
      };
      case 1 : {
         setListFiltred( list.filter(l => l.isMarked === false) );
        break;
      };
      case 2 : {
         setListFiltred( list.filter(l => l.isMarked === true) );
        break;
      };
    }
  }, [filters,list]);

  return (
      <div className={styles.homecontainer}>
        <Head>
          <title>Todo List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <h1>TO DO</h1>
          <Image onClick={mudarTema} src="/icon/icon-sun.svg" alt="Mudar Tema" layout="fixed" width={40} height={40}/>
        </header>

        <form onSubmit={onSubmit}>
          <input onChange={() => setMarked(marked ? false : true)} type="checkbox"/>
          <input value={text} onChange={ event  => setText(event.target.value) } type="text" required className={styles.input}/>
          <button style={{display : 'none'}} type="submit"></button>
        </form>
        <div className={styles.listtable}>

          { listFiltred?.map(l => criarItem(l)) }

          <div className={styles.listlink}>
            <a  style={filters == 0 ? {color: "hsl(233, 31%, 54%)"} : {}} onClick={() => setFilters(0)}>All</a>
            <a  style={filters == 1 ? {color: "hsl(233, 31%, 54%)"} : {}} onClick={() => setFilters(1)}>Active</a>
            <a  style={filters == 2 ? {color: "hsl(233, 31%, 54%)"} : {}} onClick={() => setFilters(2)}>Completed</a>
          </div>
        </div>
      </div>
  )
}
