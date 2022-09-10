import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@sharedcontainer/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@sharedcontainer/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@sharederrors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new  UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: '1234',
      email: 'user@example.com',
      name: 'test',
      password: 'test'
    });

    await sendForgotPasswordMailUseCase.execute('user@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async() =>{
    await expect(
      sendForgotPasswordMailUseCase.execute("userteste@gmail.com")
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it("should be able to create a new users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '1234',
      email: 'user@example.com',
      name: 'test',
      password: 'test'
    });

    await sendForgotPasswordMailUseCase.execute("user@example.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
})