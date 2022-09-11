import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database_hrq: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
    })
  )
}

//getConnectionOptions().then(options => {
//  const newOptions = options as IOptions;
//  newOptions.host = 'database_hrq'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//  createConnection({
//    ...options,
//  });
//});


//Função p/ trabalhar com database em outro container docker
/*export default async (host = 'database_hrq'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? "localhost" : host,
      database_hrq: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
    })
  )
}*/